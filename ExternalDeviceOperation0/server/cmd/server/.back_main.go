package back_main

import (
	"fmt"
	"log"
	"net"

	edoc "edo/proto"
	"edo/server"

	"google.golang.org/grpc"
)

func main() {

	//err := server.WrapperedGRPCWebServe(nsfu, addr, cert, key)
	//if err != nil {
	//	logger.Error(err, "failed to serve SFU")
	//	os.Exit(1)
	//}

	lis, err := net.Listen("tcp", fmt.Sprintf("localhost:8008"))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()

	edoc.RegisterEdoServiceServer(s, server.NewEdoServer())

	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}
