package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"

	pb "platform0/helloworld"

	"google.golang.org/grpc"
)

var (
	port = flag.Int("port", 9090, "The server port")
)

// serverはhelloworld.GreeterServerを実装するために使用されます。
type server struct {
	pb.UnimplementedGreeterServer
}

// SayHelloはhelloworld.GreeterServerを実装する
func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	log.Printf("Received: %v", in.GetName())
	return &pb.HelloReply{Message: "Hello " + in.GetName()}, nil
}

func main() {
	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}