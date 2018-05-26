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
	pb "google.golang.org/grpc/reflection/grpc_reflection_v1alpha"
)

var (
	useTls      = flag.Bool("use_tls", true, "Use TLS")
	tlsUserCert = flag.String("tls_user_crt", "$HOME/.grpc-ui/user.crt", "TLS client certificate to use")
	tlsUserKey  = flag.String("tls_user_key", "$HOME/.grpc-ui/user.key", "TLS client certificate key to use")
)

type Reflection struct {
	Services        []string
	FileDescriptors [][]byte
}

func grpcTransportCredentials() grpc.DialOption {
	if !*useTls {
		return grpc.WithInsecure()
	}
	tc := tls.Config{}
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

func GetReflection(ctx context.Context, addr string) (*Reflection, error) {
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	conn, err := grpc.DialContext(ctx, addr, grpcTransportCredentials())

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
	conn, err := grpc.DialContext(ctx, addr, grpcTransportCredentials())
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
