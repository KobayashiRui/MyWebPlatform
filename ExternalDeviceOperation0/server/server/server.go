package server

import (
	"context"
	edoc "edo/proto"
	"io"
	"log"
	"time"

	"github.com/google/uuid"
	"google.golang.org/grpc/metadata"
)

//Device List
//device name : uuid
var DeviceList map[string]string = make(map[string]string)

type Command struct {
	Com string
	Res chan string
}

// PongServer empty struct for gRPC interfaces
// ExDeviceStream
// id : ExDeviceStream (コマンドのFIFOバッファ的なもの)
type EdoServer struct {
	edoc.UnimplementedEdoServiceServer
	ExDeviceStreams map[string]chan Command
}

func NewEdoServer() *EdoServer {
	return &EdoServer{
		ExDeviceStreams: make(map[string]chan Command),
	}
}

//Deviceの追加
func (s *EdoServer) AddDevice(ctx context.Context, in *edoc.AddDeviceRequest) (*edoc.AddDeviceResponse, error) {
	//s.ExDeviceStreams = append(s.ExDeviceStreams, ExDeviceStream{in.GetDeviceId()})
	//create token
	uuidObj, _ := uuid.NewRandom()

	//set object
	DeviceList[in.GetName()] = uuidObj.String()
	return &edoc.AddDeviceResponse{Devid: uuidObj.String()}, nil
}

//Device一覧の取得
func (s *EdoServer) GetDevices(ctx context.Context, in *edoc.GetDevicesRequest) (*edoc.GetDevicesResponse, error) {
	return &edoc.GetDevicesResponse{Devices: DeviceList}, nil
}

//Deviceの操作
func (s *EdoServer) Controller(ctx context.Context, in *edoc.ControlleRequest) (*edoc.ControlleResponse, error) {

	uuid := DeviceList[in.GetName()]

	rec := make(chan string)
	command := Command{in.GetCommand(), rec}

	s.ExDeviceStreams[uuid] <- command

	//返信の受信待機
	select {
	case received := <-rec:
		return &edoc.ControlleResponse{Result: received}, nil

	case <-time.After(30 * time.Second):
		return &edoc.ControlleResponse{Result: "error"}, nil
	}

}

// PingPongRPC stream gRPC func
func (s *EdoServer) ExController(stream edoc.EdoService_ExControllerServer) error {
	//get token from metadata
	md, _ := metadata.FromIncomingContext(stream.Context())
	token := md["authorization"][0]

	log.Printf("token: %v", token)

	//token is uuid

	//create chan fron command
	s.ExDeviceStreams[token] = make(chan Command)

	sendcom := false
	cid := ""
	var command Command
	for {
		if !sendcom {
			//get command
			command = <-s.ExDeviceStreams[token]
			//create cid
			cidObj, _ := uuid.NewRandom()
			cid = cidObj.String()

			request := edoc.ExControllerRequest{Cid: cid, Command: command.Com}

			err := stream.Send(&request)
			if err != nil {
				log.Printf("send error: %v", err)
				continue
			} else {
				sendcom = true
			}
		}

		//receive command
		in, err := stream.Recv()
		if err == io.EOF {
			return nil
		}
		if err != nil {
			return err
		}

		//check cid
		if cid == in.GetCid() {
			command.Res <- in.GetResult()
			sendcom = false
		}

		log.Printf("Command Result : %v", command)
	}
	//get metadata
	// metadataからどのデバイスかを特定する
}
