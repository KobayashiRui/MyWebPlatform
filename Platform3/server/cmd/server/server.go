package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"
	"time"

	pb "platform1/proto"

	"google.golang.org/grpc"
)

var (
	port = flag.Int("port", 9090, "The server port")
)

// serverはhelloworld.GreeterServerを実装するために使用されます。
type server struct {
	pb.UnimplementedCommunicateTestServer
}

func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	log.Printf("Received: %v", in.GetName())
	return &pb.HelloReply{Message: "Hello " + in.GetName()}, nil
}

func (s *server) Notification(req *pb.NotificationRequest, stream pb.CommunicateTest_NotificationServer) error {
	fmt.Println("Get Request")
	for i := int32(0); i < req.GetNum(); i++ {
		if err := stream.Send(&pb.NotificationReply{
			Num: i,
		}); err != nil {
			return err
		}
		time.Sleep(time.Second * 1)
	}
	return nil
}

func main() {
	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterCommunicateTestServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
