package main

import (
	"io"
	"log"
	"net"
	"time"

	"google.golang.org/grpc"

	pb "stream-pingpong/proto"
)

// PongServer empty struct for gRPC interfaces
type PingPongServer struct {
	pb.UnimplementedPingPongServiceServer
}

// PingPongRPC stream gRPC func
func (ps *PingPongServer) PingPongRPC(stream pb.PingPongService_PingPongRPCServer) error {
	log.Println("Started stream")
	msg := &pb.PingData{
		Msg:  "Ping Ball",
		Ball: 0,
	}
	for {
		time.Sleep(2 * time.Second)
		log.Println("send message")
		err := stream.Send(msg)
		if err != nil {
			return err
		}

		log.Println("Ping ...>", msg.GetBall())
		time.Sleep(2 * time.Second)

		in, err := stream.Recv()
		if err == io.EOF {
			log.Println("END")
			return nil
		}
		if err != nil {
			log.Println("END")
			return err
		}
		log.Println("<...Pong", in.Ball)

		msg = &pb.PingData{
			Msg:  "Ping Ball",
			Ball: in.Ball,
		}

	}
}

func main() {
	grpcServer := grpc.NewServer()
	pb.RegisterPingPongServiceServer(grpcServer, &PingPongServer{})

	l, err := net.Listen("tcp", ":6000")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	log.Println("Listening on tcp://localhost:6000")
	grpcServer.Serve(l)
}
