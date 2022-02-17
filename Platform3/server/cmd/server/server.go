package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	pb "platform3/proto"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"google.golang.org/grpc"
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
	//flag.Parse()
	//lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", *port))
	//if err != nil {
	//	log.Fatalf("failed to listen: %v", err)
	//}

	s := grpc.NewServer()
	pb.RegisterCommunicateTestServer(s, &server{})

	//log.Printf("server listening at %v", lis.Addr())

	websocketOriginFunc := grpcweb.WithWebsocketOriginFunc(func(req *http.Request) bool {
		return true
	})
	httpOriginFunc := grpcweb.WithOriginFunc(func(origin string) bool {
		return true
	})

	wrappedServer := grpcweb.WrapServer(
		s,
		grpcweb.WithWebsockets(true),
		httpOriginFunc,
		websocketOriginFunc,
	)

	handler := func(resp http.ResponseWriter, req *http.Request) {
		wrappedServer.ServeHTTP(resp, req)
	}

	rpcWebServer := http.Server{
		Addr:    "localhost:9090",
		Handler: http.HandlerFunc(handler),
	}

	//if err := s.Serve(lis); err != nil {
	//	log.Fatalf("failed to serve: %v", err)
	//}

	if err := rpcWebServer.ListenAndServe(); err != nil {
		fmt.Printf("Web server (GRPC) shutdown: %s", err)
	}

}
