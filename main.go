package main

import (
	"flag"
	"log"
	"os"

	url "github.com/dhtech/go-openurl"
	"github.com/lazada/grpc-ui/http_server"
)

var (
	addr = flag.String("addr", "[::1]:7000", "http server listening addr")
)

func openUrl() {
	url.Open("http://" + *addr)
}

func main() {
	flag.Parse()

	if *addr == "" {
		flag.Usage()
		os.Exit(2)
	}

	srv := http_server.New(*addr)
	go openUrl()
	if err := srv.Start(); err != nil {
		log.Printf("http server error: %v", err)
		os.Exit(1)
	}
}
