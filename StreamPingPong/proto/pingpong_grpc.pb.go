// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.6.1
// source: proto/pingpong.proto

package pingpong

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

// PingPongServiceClient is the client API for PingPongService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type PingPongServiceClient interface {
	PingPongRPC(ctx context.Context, opts ...grpc.CallOption) (PingPongService_PingPongRPCClient, error)
}

type pingPongServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewPingPongServiceClient(cc grpc.ClientConnInterface) PingPongServiceClient {
	return &pingPongServiceClient{cc}
}

func (c *pingPongServiceClient) PingPongRPC(ctx context.Context, opts ...grpc.CallOption) (PingPongService_PingPongRPCClient, error) {
	stream, err := c.cc.NewStream(ctx, &PingPongService_ServiceDesc.Streams[0], "/pingpong.PingPongService/PingPongRPC", opts...)
	if err != nil {
		return nil, err
	}
	x := &pingPongServicePingPongRPCClient{stream}
	return x, nil
}

type PingPongService_PingPongRPCClient interface {
	Send(*PongData) error
	Recv() (*PingData, error)
	grpc.ClientStream
}

type pingPongServicePingPongRPCClient struct {
	grpc.ClientStream
}

func (x *pingPongServicePingPongRPCClient) Send(m *PongData) error {
	return x.ClientStream.SendMsg(m)
}

func (x *pingPongServicePingPongRPCClient) Recv() (*PingData, error) {
	m := new(PingData)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// PingPongServiceServer is the server API for PingPongService service.
// All implementations must embed UnimplementedPingPongServiceServer
// for forward compatibility
type PingPongServiceServer interface {
	PingPongRPC(PingPongService_PingPongRPCServer) error
	mustEmbedUnimplementedPingPongServiceServer()
}

// UnimplementedPingPongServiceServer must be embedded to have forward compatible implementations.
type UnimplementedPingPongServiceServer struct {
}

func (UnimplementedPingPongServiceServer) PingPongRPC(PingPongService_PingPongRPCServer) error {
	return status.Errorf(codes.Unimplemented, "method PingPongRPC not implemented")
}
func (UnimplementedPingPongServiceServer) mustEmbedUnimplementedPingPongServiceServer() {}

// UnsafePingPongServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to PingPongServiceServer will
// result in compilation errors.
type UnsafePingPongServiceServer interface {
	mustEmbedUnimplementedPingPongServiceServer()
}

func RegisterPingPongServiceServer(s grpc.ServiceRegistrar, srv PingPongServiceServer) {
	s.RegisterService(&PingPongService_ServiceDesc, srv)
}

func _PingPongService_PingPongRPC_Handler(srv interface{}, stream grpc.ServerStream) error {
	return srv.(PingPongServiceServer).PingPongRPC(&pingPongServicePingPongRPCServer{stream})
}

type PingPongService_PingPongRPCServer interface {
	Send(*PingData) error
	Recv() (*PongData, error)
	grpc.ServerStream
}

type pingPongServicePingPongRPCServer struct {
	grpc.ServerStream
}

func (x *pingPongServicePingPongRPCServer) Send(m *PingData) error {
	return x.ServerStream.SendMsg(m)
}

func (x *pingPongServicePingPongRPCServer) Recv() (*PongData, error) {
	m := new(PongData)
	if err := x.ServerStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// PingPongService_ServiceDesc is the grpc.ServiceDesc for PingPongService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var PingPongService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "pingpong.PingPongService",
	HandlerType: (*PingPongServiceServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "PingPongRPC",
			Handler:       _PingPongService_PingPongRPC_Handler,
			ServerStreams: true,
			ClientStreams: true,
		},
	},
	Metadata: "proto/pingpong.proto",
}