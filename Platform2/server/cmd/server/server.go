package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"log"
	"net"

	pb "todolist-platform/proto"

	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"

	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
)

type User struct {
	Email    string
	Password string
}

var userDataList []User = []User{}

var tokenUserList map[string]User = make(map[string]User)

//token key
var mySigningKey []byte = []byte("HogehogeFugafuga")

var (
	port = flag.Int("port", 9090, "The server port")
)

type server struct {
	pb.UnimplementedTodoListServiceServer
}

//SignInの処理
func (s *server) SignIn(ctx context.Context, in *pb.SignInRequest) (*pb.SignInReply, error) {
	log.Printf("email:%s", in.GetEmail())
	log.Printf("password:%s", in.GetPassword())
	for _, user := range userDataList {
		log.Printf("user email:%s", user.Email)
		log.Printf("user password:%s", user.Password)
		if user.Email == in.GetEmail() && user.Password == in.GetPassword() {
			log.Printf("signin OK")

			//custom Claims
			type MyCustomClaims struct {
				jwt.StandardClaims
			}

			//create uuid
			uuidObj, _ := uuid.NewRandom()

			claims := MyCustomClaims{
				jwt.StandardClaims{
					Issuer: "platform2",
					Id:     uuidObj.String(),
				},
			}

			//create token
			token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

			stoken, _ := token.SignedString(mySigningKey)

			//set token in list
			tokenUserList[stoken] = user

			return &pb.SignInReply{Token: stoken}, nil
		}
	}

	//TODO error handling
	return &pb.SignInReply{Token: "error"}, nil
}

//SignUp
func (s *server) SignUp(ctx context.Context, in *pb.SignUpRequest) (*pb.SignUpReply, error) {
	for _, user := range userDataList {
		if user.Email == in.GetEmail() && user.Password == in.GetPassword() {
			return &pb.SignUpReply{Email: "error"}, nil
		}
	}

	// add new account
	userDataList = append(userDataList, User{in.GetEmail(), in.GetPassword()})

	return &pb.SignUpReply{Email: in.GetEmail()}, nil
}

//SignIn中のユーザー情報の取得
//func (s *server) UserInfo(ctx context.Context, in *pb.UserInfoRequest) (*pb.UserInfoReply, error){
//	return
//}

//get user info
func (s *server) UserInfo(ctx context.Context, in *pb.UserInfoRequest) (*pb.UserInfoReply, error) {
	user := ctx.Value("user").(User)

	log.Printf("user email: %v", user.Email)
	log.Printf("user pw: %v", user.Password)
	return &pb.UserInfoReply{Email: user.Email, Password: user.Password}, nil

}

//meta data
func AuthInterceptor() grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
		newCtx, err := authorize(ctx, info.FullMethod)

		if err != nil {
			return nil, err
		}

		return handler(newCtx, req)
	}
}

func authorize(ctx context.Context, fullMethodName string) (context.Context, error) {
	log.Printf("method %s", fullMethodName)

	//authを無視するプロトコル
	if fullMethodName == "/todolistProto.TodoListService/SignIn" {
		return ctx, nil
	}

	//metadata からkeyを取得
	md, ok := metadata.FromIncomingContext(ctx)

	if !ok {
		return ctx, errors.New("authentication failed")
	}

	//metadataからx-auth-tokenを取得
	keyData := md["x-auth-token"][0]

	log.Printf("Token Data: %s", keyData)

	//metadataのkeyからUserを取得してctxにuserとして設定する
	ctx = context.WithValue(ctx, "user", tokenUserList[keyData])

	return ctx, nil
}

func main() {
	userDataList = append(userDataList, User{"test@gmail.com", "hogehoge"})

	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer(
		grpc.UnaryInterceptor(AuthInterceptor()),
	)
	pb.RegisterTodoListServiceServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
