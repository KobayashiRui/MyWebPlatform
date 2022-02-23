package server

import (
	"context"
	edoc "edo/proto"
	"io"
	"log"
	"sync"
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

	case <-time.After(60 * time.Second):
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

	//sendcom := false
	//cid := ""
	//cid := make(chan string)

	type SendCommand struct {
		mu      sync.Mutex
		enable  bool
		cid     string
		com     string
		res     chan string
		timeout *time.Timer
	}

	sendcom := SendCommand{enable: false}

	go func() {
		for {
			if !sendcom.enable {
				command := <-s.ExDeviceStreams[token]
				cidObj, _ := uuid.NewRandom()
				cid := cidObj.String()
				sendcom.mu.Lock()
				sendcom.cid = cid
				sendcom.com = command.Com
				sendcom.res = command.Res
				sendcom.mu.Unlock()
				request := edoc.ExControllerRequest{Cid: cid, Command: command.Com}

				err := stream.Send(&request)
				if err != nil {
					log.Printf("send error: %v", err)
					continue
				} else {
					sendcom.mu.Lock()
					sendcom.enable = true
					sendcom.timeout = time.NewTimer(3 * time.Second)
					sendcom.mu.Unlock()
				}
			} else { //sendcom.enable == true
				select {
				case <-sendcom.timeout.C: //timeout!
					sendcom.mu.Lock()
					sendcom.res <- "timeout"
					sendcom.enable = false
					sendcom.mu.Unlock()
				default:
				}
			}
		}
	}()

	for {

		//if !sendcom {
		//	//get command
		//	command = <-s.ExDeviceStreams[token]
		//	//create cid
		//	cidObj, _ := uuid.NewRandom()
		//	cid = cidObj.String()

		//	request := edoc.ExControllerRequest{Cid: cid, Command: command.Com}

		//	err := stream.Send(&request)
		//	if err != nil {
		//		log.Printf("send error: %v", err)
		//		continue
		//	} else {
		//		sendcom = true
		//	}
		//}

		//receive command

		//TODO timeout
		in, err := stream.Recv()
		if err == io.EOF {
			log.Println("close")
			return nil
		}
		if err != nil {
			log.Println("error close")
			return err
		}

		//check cid
		if sendcom.enable && sendcom.cid == in.GetCid() {
			log.Printf("get message: %v", in.GetResult())
			sendcom.res <- in.GetResult()
			sendcom.mu.Lock()
			sendcom.enable = false
			sendcom.mu.Unlock()
		}

		//log.Printf("Command Result : %v", command)
	}
	//get metadata
	// metadataからどのデバイスかを特定する
}
