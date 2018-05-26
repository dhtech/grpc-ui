package reflection

import (
	"context"
	"crypto/tls"
	"errors"
	"flag"
	"log"
	"os"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/naming"
	pb "google.golang.org/grpc/reflection/grpc_reflection_v1alpha"
)

var (
	useTls      = flag.Bool("use_tls", true, "Use TLS")
	useLb       = flag.Bool("use_lb", true, "Use GRPC naming / GRPCLB resolution")
	tlsUserCert = flag.String("tls_user_crt", "$HOME/.grpc-ui/user.crt", "TLS client certificate to use")
	tlsUserKey  = flag.String("tls_user_key", "$HOME/.grpc-ui/user.key", "TLS client certificate key to use")
)

type Reflection struct {
	Services        []string
	FileDescriptors [][]byte
}

func grpcTransportCredentials(server string) grpc.DialOption {
	if !*useTls {
		return grpc.WithInsecure()
	}
	tc := tls.Config{}
	if *useLb {
		tc.ServerName = server
	}
	cert, err := tls.LoadX509KeyPair(os.ExpandEnv(*tlsUserCert), os.ExpandEnv(*tlsUserKey))
	if err != nil {
		log.Printf("unable to load client certificate, proceeding without")
	} else {
		tc.Certificates = []tls.Certificate{cert}
	}
	return grpc.WithTransportCredentials(
		credentials.NewTLS(&tc),
	)
}

func dialContext(ctx context.Context, addr string) (*grpc.ClientConn, error) {
	creds := grpcTransportCredentials(addr)
	if !*useLb {
		conn, err := grpc.DialContext(ctx, addr, creds)
		return conn, err
	}

        resolver, err := naming.NewDNSResolver()
        if err != nil {
                log.Fatalf("unable to create resolver: %v", err)
        }
        watcher, err := resolver.Resolve(addr)
        if err != nil {
		return nil, err
        }
        targets, err := watcher.Next()
        if err != nil {
		return nil, err
        }

        var conn *grpc.ClientConn
        for _, target := range targets {
                var err error
                conn, err = grpc.Dial(target.Addr, creds)
                if err != nil {
                        log.Printf("could not connect to %s: %v", target.Addr, err)
                        conn = nil
                }
		return conn, nil
        }
	return nil, errors.New("no alive backends")
}

func GetReflection(ctx context.Context, addr string) (*Reflection, error) {
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	conn, err := dialContext(ctx, addr)

	if err != nil {
		return nil, err
	}

	defer conn.Close()

	client := pb.NewServerReflectionClient(conn)

	stream, err := client.ServerReflectionInfo(ctx)

	if err != nil {
		return nil, err
	}

	services, err := getServices(stream)

	if err != nil {
		return nil, err
	}

	fileDescriptors, err := getFileDescriptors(stream, services)

	if err != nil {
		return nil, err
	}

	return &Reflection{
		Services:        services,
		FileDescriptors: fileDescriptors,
	}, nil
}

func getServices(stream pb.ServerReflection_ServerReflectionInfoClient) ([]string, error) {
	err := stream.SendMsg(&pb.ServerReflectionRequest{
		MessageRequest: &pb.ServerReflectionRequest_ListServices{},
	})

	if err != nil {
		return nil, err
	}

	res, err := stream.Recv()
	if err != nil {
		return nil, err
	}

	if errorRes := res.GetErrorResponse(); errorRes != nil {
		return nil, errors.New(errorRes.ErrorMessage)
	}

	serviceRes := res.GetListServicesResponse()

	if serviceRes == nil {
		return nil, errors.New("Unexpected reflection response")
	}

	r := make([]string, 0, len(serviceRes.Service))

	for _, service := range serviceRes.Service {
		if service.Name != "grpc.reflection.v1alpha.ServerReflection" {
			r = append(r, service.Name)
		}
	}

	return r, nil
}

func getFileDescriptors(stream pb.ServerReflection_ServerReflectionInfoClient, services []string) ([][]byte, error) {
	for _, service := range services {
		err := stream.SendMsg(&pb.ServerReflectionRequest{
			MessageRequest: &pb.ServerReflectionRequest_FileContainingSymbol{
				FileContainingSymbol: service,
			},
		})

		if err != nil {
			return nil, err
		}
	}

	r := make([][]byte, 0, len(services))

	for i := 0; i < len(services); i++ {
		res, err := stream.Recv()
		if err != nil {
			return nil, err
		}

		if errorRes := res.GetErrorResponse(); errorRes != nil {
			return nil, errors.New(errorRes.ErrorMessage)
		}

		fileRes := res.GetFileDescriptorResponse()

		if fileRes == nil {
			return nil, errors.New("Unexpected reflection response")
		}

		r = append(r, fileRes.FileDescriptorProto...)
	}

	return r, nil
}

func Invoke(
	ctx context.Context,
	addr string,
	method string,
	payload []byte,
) ([]byte, error) {
	conn, err := dialContext(ctx, addr)
	if err != nil {
		return nil, err
	}

	defer conn.Close()

	req := &Message{Payload: payload}
	res := &Message{}

	err = grpc.Invoke(ctx, method, req, res, conn)

	if err != nil {
		return nil, err
	}

	return res.Payload, nil
}
