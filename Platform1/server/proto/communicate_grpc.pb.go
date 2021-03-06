// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.6.1
// source: proto/communicate.proto

package communicate

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

// CommunicateTestClient is the client API for CommunicateTest service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type CommunicateTestClient interface {
	//Unary RPCs
	SayHello(ctx context.Context, in *HelloRequest, opts ...grpc.CallOption) (*HelloReply, error)
	//Server streaming RPC
	Notification(ctx context.Context, in *NotificationRequest, opts ...grpc.CallOption) (CommunicateTest_NotificationClient, error)
	//Client streaming RPC
	Upload(ctx context.Context, opts ...grpc.CallOption) (CommunicateTest_UploadClient, error)
	//Bidirectional streaming RPC
	Chat(ctx context.Context, opts ...grpc.CallOption) (CommunicateTest_ChatClient, error)
}

type communicateTestClient struct {
	cc grpc.ClientConnInterface
}

func NewCommunicateTestClient(cc grpc.ClientConnInterface) CommunicateTestClient {
	return &communicateTestClient{cc}
}

func (c *communicateTestClient) SayHello(ctx context.Context, in *HelloRequest, opts ...grpc.CallOption) (*HelloReply, error) {
	out := new(HelloReply)
	err := c.cc.Invoke(ctx, "/communicate.CommunicateTest/SayHello", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *communicateTestClient) Notification(ctx context.Context, in *NotificationRequest, opts ...grpc.CallOption) (CommunicateTest_NotificationClient, error) {
	stream, err := c.cc.NewStream(ctx, &CommunicateTest_ServiceDesc.Streams[0], "/communicate.CommunicateTest/Notification", opts...)
	if err != nil {
		return nil, err
	}
	x := &communicateTestNotificationClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type CommunicateTest_NotificationClient interface {
	Recv() (*NotificationReply, error)
	grpc.ClientStream
}

type communicateTestNotificationClient struct {
	grpc.ClientStream
}

func (x *communicateTestNotificationClient) Recv() (*NotificationReply, error) {
	m := new(NotificationReply)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

func (c *communicateTestClient) Upload(ctx context.Context, opts ...grpc.CallOption) (CommunicateTest_UploadClient, error) {
	stream, err := c.cc.NewStream(ctx, &CommunicateTest_ServiceDesc.Streams[1], "/communicate.CommunicateTest/Upload", opts...)
	if err != nil {
		return nil, err
	}
	x := &communicateTestUploadClient{stream}
	return x, nil
}

type CommunicateTest_UploadClient interface {
	Send(*UploadRequest) error
	CloseAndRecv() (*UploadReply, error)
	grpc.ClientStream
}

type communicateTestUploadClient struct {
	grpc.ClientStream
}

func (x *communicateTestUploadClient) Send(m *UploadRequest) error {
	return x.ClientStream.SendMsg(m)
}

func (x *communicateTestUploadClient) CloseAndRecv() (*UploadReply, error) {
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	m := new(UploadReply)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

func (c *communicateTestClient) Chat(ctx context.Context, opts ...grpc.CallOption) (CommunicateTest_ChatClient, error) {
	stream, err := c.cc.NewStream(ctx, &CommunicateTest_ServiceDesc.Streams[2], "/communicate.CommunicateTest/Chat", opts...)
	if err != nil {
		return nil, err
	}
	x := &communicateTestChatClient{stream}
	return x, nil
}

type CommunicateTest_ChatClient interface {
	Send(*ChatRequest) error
	Recv() (*ChatReply, error)
	grpc.ClientStream
}

type communicateTestChatClient struct {
	grpc.ClientStream
}

func (x *communicateTestChatClient) Send(m *ChatRequest) error {
	return x.ClientStream.SendMsg(m)
}

func (x *communicateTestChatClient) Recv() (*ChatReply, error) {
	m := new(ChatReply)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// CommunicateTestServer is the server API for CommunicateTest service.
// All implementations must embed UnimplementedCommunicateTestServer
// for forward compatibility
type CommunicateTestServer interface {
	//Unary RPCs
	SayHello(context.Context, *HelloRequest) (*HelloReply, error)
	//Server streaming RPC
	Notification(*NotificationRequest, CommunicateTest_NotificationServer) error
	//Client streaming RPC
	Upload(CommunicateTest_UploadServer) error
	//Bidirectional streaming RPC
	Chat(CommunicateTest_ChatServer) error
	mustEmbedUnimplementedCommunicateTestServer()
}

// UnimplementedCommunicateTestServer must be embedded to have forward compatible implementations.
type UnimplementedCommunicateTestServer struct {
}

func (UnimplementedCommunicateTestServer) SayHello(context.Context, *HelloRequest) (*HelloReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SayHello not implemented")
}
func (UnimplementedCommunicateTestServer) Notification(*NotificationRequest, CommunicateTest_NotificationServer) error {
	return status.Errorf(codes.Unimplemented, "method Notification not implemented")
}
func (UnimplementedCommunicateTestServer) Upload(CommunicateTest_UploadServer) error {
	return status.Errorf(codes.Unimplemented, "method Upload not implemented")
}
func (UnimplementedCommunicateTestServer) Chat(CommunicateTest_ChatServer) error {
	return status.Errorf(codes.Unimplemented, "method Chat not implemented")
}
func (UnimplementedCommunicateTestServer) mustEmbedUnimplementedCommunicateTestServer() {}

// UnsafeCommunicateTestServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to CommunicateTestServer will
// result in compilation errors.
type UnsafeCommunicateTestServer interface {
	mustEmbedUnimplementedCommunicateTestServer()
}

func RegisterCommunicateTestServer(s grpc.ServiceRegistrar, srv CommunicateTestServer) {
	s.RegisterService(&CommunicateTest_ServiceDesc, srv)
}

func _CommunicateTest_SayHello_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(HelloRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CommunicateTestServer).SayHello(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/communicate.CommunicateTest/SayHello",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CommunicateTestServer).SayHello(ctx, req.(*HelloRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _CommunicateTest_Notification_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(NotificationRequest)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(CommunicateTestServer).Notification(m, &communicateTestNotificationServer{stream})
}

type CommunicateTest_NotificationServer interface {
	Send(*NotificationReply) error
	grpc.ServerStream
}

type communicateTestNotificationServer struct {
	grpc.ServerStream
}

func (x *communicateTestNotificationServer) Send(m *NotificationReply) error {
	return x.ServerStream.SendMsg(m)
}

func _CommunicateTest_Upload_Handler(srv interface{}, stream grpc.ServerStream) error {
	return srv.(CommunicateTestServer).Upload(&communicateTestUploadServer{stream})
}

type CommunicateTest_UploadServer interface {
	SendAndClose(*UploadReply) error
	Recv() (*UploadRequest, error)
	grpc.ServerStream
}

type communicateTestUploadServer struct {
	grpc.ServerStream
}

func (x *communicateTestUploadServer) SendAndClose(m *UploadReply) error {
	return x.ServerStream.SendMsg(m)
}

func (x *communicateTestUploadServer) Recv() (*UploadRequest, error) {
	m := new(UploadRequest)
	if err := x.ServerStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

func _CommunicateTest_Chat_Handler(srv interface{}, stream grpc.ServerStream) error {
	return srv.(CommunicateTestServer).Chat(&communicateTestChatServer{stream})
}

type CommunicateTest_ChatServer interface {
	Send(*ChatReply) error
	Recv() (*ChatRequest, error)
	grpc.ServerStream
}

type communicateTestChatServer struct {
	grpc.ServerStream
}

func (x *communicateTestChatServer) Send(m *ChatReply) error {
	return x.ServerStream.SendMsg(m)
}

func (x *communicateTestChatServer) Recv() (*ChatRequest, error) {
	m := new(ChatRequest)
	if err := x.ServerStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// CommunicateTest_ServiceDesc is the grpc.ServiceDesc for CommunicateTest service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var CommunicateTest_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "communicate.CommunicateTest",
	HandlerType: (*CommunicateTestServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "SayHello",
			Handler:    _CommunicateTest_SayHello_Handler,
		},
	},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "Notification",
			Handler:       _CommunicateTest_Notification_Handler,
			ServerStreams: true,
		},
		{
			StreamName:    "Upload",
			Handler:       _CommunicateTest_Upload_Handler,
			ClientStreams: true,
		},
		{
			StreamName:    "Chat",
			Handler:       _CommunicateTest_Chat_Handler,
			ServerStreams: true,
			ClientStreams: true,
		},
	},
	Metadata: "proto/communicate.proto",
}
