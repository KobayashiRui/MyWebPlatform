package main

import (
	"log"
	"time"

	"golang.org/x/net/context"
	"google.golang.org/grpc"

	pb "stream-pingpong/proto"
)

func main() {
	run()
}

func run() {
	conn, err := grpc.Dial("localhost:6000", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("failed to connect: %s", err)
	}
	defer conn.Close()

	client := pb.NewPingPongServiceClient(conn)
	stream, err := client.PingPongRPC(context.Background())
	waitc := make(chan struct{})

	go func() {
		for {
			in, err := stream.Recv()
			if err != nil {
				log.Fatal(err)
			}
			log.Println("Ping!...>", in.Ball)

			time.Sleep(2 * time.Second)
			msg := &pb.PongData{
				Msg:  "Pong Ball",
				Ball: in.GetBall() + 1,
			}
			stream.Send(msg)
			log.Println("<...Pong!", msg.Ball)
		}
	}()

	<-waitc
	stream.CloseSend()
}
