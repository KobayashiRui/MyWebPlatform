package main

import (
	"context"
	"io"
	"log"
	"net"
	"time"

	"google.golang.org/grpc"

	pb "edo/proto"
)

}

type Command struct {
	Command string
	Result chan string
}

type ExDeviceStream struct {
	DeviceId string
	Commands []chan Command
}

// PongServer empty struct for gRPC interfaces
type EdoServer struct {
	pb.UnimplementedEdoServiceServer
	ExDeviceStreams []ExDeviceStream
}

//Deviceの追加
func (s *EdoServer) AddDevice(ctx context.Context, in *pb.AddDeviceRequest) (*pb.AddDeviceResponse, error) {
	s.ExDeviceStreams = append(s.ExDeviceStreams, ExDeviceStream{in.GetDeviceId()})
}

//Device一覧の取得

//Deviceの操作
func (s *EdoServer) Controller(ctx context.Context, in *pb.ControlleRequest) (*pb.ControlleResponse, error) {

	return &pb.ControlleResponse{Result: "ok"}, nil
}


// PingPongRPC stream gRPC func
func (s *EdoServer) ExController(stream pb.EdoService_ExControllerServer) error {
	log.Println("Started stream")
	//get metadata
	// metadataからどのデバイスかを特定する

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
