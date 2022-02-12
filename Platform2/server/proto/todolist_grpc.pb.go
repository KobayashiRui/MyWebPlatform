// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.6.1
// source: proto/todolist.proto

package todolistProto

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// TodoListServiceClient is the client API for TodoListService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type TodoListServiceClient interface {
	SignIn(ctx context.Context, in *SignInRequest, opts ...grpc.CallOption) (*SignInReply, error)
	SignUp(ctx context.Context, in *SignUpRequest, opts ...grpc.CallOption) (*SignUpReply, error)
	UserInfo(ctx context.Context, in *UserInfoRequest, opts ...grpc.CallOption) (*UserInfoReply, error)
	Notification(ctx context.Context, in *NotificationRequest, opts ...grpc.CallOption) (TodoListService_NotificationClient, error)
}

type todoListServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewTodoListServiceClient(cc grpc.ClientConnInterface) TodoListServiceClient {
	return &todoListServiceClient{cc}
}

func (c *todoListServiceClient) SignIn(ctx context.Context, in *SignInRequest, opts ...grpc.CallOption) (*SignInReply, error) {
	out := new(SignInReply)
	err := c.cc.Invoke(ctx, "/todolistProto.TodoListService/SignIn", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *todoListServiceClient) SignUp(ctx context.Context, in *SignUpRequest, opts ...grpc.CallOption) (*SignUpReply, error) {
	out := new(SignUpReply)
	err := c.cc.Invoke(ctx, "/todolistProto.TodoListService/SignUp", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *todoListServiceClient) UserInfo(ctx context.Context, in *UserInfoRequest, opts ...grpc.CallOption) (*UserInfoReply, error) {
	out := new(UserInfoReply)
	err := c.cc.Invoke(ctx, "/todolistProto.TodoListService/UserInfo", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *todoListServiceClient) Notification(ctx context.Context, in *NotificationRequest, opts ...grpc.CallOption) (TodoListService_NotificationClient, error) {
	stream, err := c.cc.NewStream(ctx, &TodoListService_ServiceDesc.Streams[0], "/todolistProto.TodoListService/Notification", opts...)
	if err != nil {
		return nil, err
	}
	x := &todoListServiceNotificationClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type TodoListService_NotificationClient interface {
	Recv() (*NotificationReply, error)
	grpc.ClientStream
}

type todoListServiceNotificationClient struct {
	grpc.ClientStream
}

func (x *todoListServiceNotificationClient) Recv() (*NotificationReply, error) {
	m := new(NotificationReply)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// TodoListServiceServer is the server API for TodoListService service.
// All implementations must embed UnimplementedTodoListServiceServer
// for forward compatibility
type TodoListServiceServer interface {
	SignIn(context.Context, *SignInRequest) (*SignInReply, error)
	SignUp(context.Context, *SignUpRequest) (*SignUpReply, error)
	UserInfo(context.Context, *UserInfoRequest) (*UserInfoReply, error)
	Notification(*NotificationRequest, TodoListService_NotificationServer) error
	mustEmbedUnimplementedTodoListServiceServer()
}

// UnimplementedTodoListServiceServer must be embedded to have forward compatible implementations.
type UnimplementedTodoListServiceServer struct {
}

func (UnimplementedTodoListServiceServer) SignIn(context.Context, *SignInRequest) (*SignInReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SignIn not implemented")
}
func (UnimplementedTodoListServiceServer) SignUp(context.Context, *SignUpRequest) (*SignUpReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SignUp not implemented")
}
func (UnimplementedTodoListServiceServer) UserInfo(context.Context, *UserInfoRequest) (*UserInfoReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UserInfo not implemented")
}
func (UnimplementedTodoListServiceServer) Notification(*NotificationRequest, TodoListService_NotificationServer) error {
	return status.Errorf(codes.Unimplemented, "method Notification not implemented")
}
func (UnimplementedTodoListServiceServer) mustEmbedUnimplementedTodoListServiceServer() {}

// UnsafeTodoListServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to TodoListServiceServer will
// result in compilation errors.
type UnsafeTodoListServiceServer interface {
	mustEmbedUnimplementedTodoListServiceServer()
}

func RegisterTodoListServiceServer(s grpc.ServiceRegistrar, srv TodoListServiceServer) {
	s.RegisterService(&TodoListService_ServiceDesc, srv)
}

func _TodoListService_SignIn_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SignInRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TodoListServiceServer).SignIn(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/todolistProto.TodoListService/SignIn",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TodoListServiceServer).SignIn(ctx, req.(*SignInRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _TodoListService_SignUp_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SignUpRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TodoListServiceServer).SignUp(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/todolistProto.TodoListService/SignUp",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TodoListServiceServer).SignUp(ctx, req.(*SignUpRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _TodoListService_UserInfo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UserInfoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TodoListServiceServer).UserInfo(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/todolistProto.TodoListService/UserInfo",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TodoListServiceServer).UserInfo(ctx, req.(*UserInfoRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _TodoListService_Notification_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(NotificationRequest)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(TodoListServiceServer).Notification(m, &todoListServiceNotificationServer{stream})
}

type TodoListService_NotificationServer interface {
	Send(*NotificationReply) error
	grpc.ServerStream
}

type todoListServiceNotificationServer struct {
	grpc.ServerStream
}

func (x *todoListServiceNotificationServer) Send(m *NotificationReply) error {
	return x.ServerStream.SendMsg(m)
}

// TodoListService_ServiceDesc is the grpc.ServiceDesc for TodoListService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var TodoListService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "todolistProto.TodoListService",
	HandlerType: (*TodoListServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "SignIn",
			Handler:    _TodoListService_SignIn_Handler,
		},
		{
			MethodName: "SignUp",
			Handler:    _TodoListService_SignUp_Handler,
		},
		{
			MethodName: "UserInfo",
			Handler:    _TodoListService_UserInfo_Handler,
		},
	},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "Notification",
			Handler:       _TodoListService_Notification_Handler,
			ServerStreams: true,
		},
	},
	Metadata: "proto/todolist.proto",
}
