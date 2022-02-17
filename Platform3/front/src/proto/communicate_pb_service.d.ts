// package: communicate
// file: proto/communicate.proto

import * as proto_communicate_pb from "../proto/communicate_pb";
import {grpc} from "@improbable-eng/grpc-web";

type CommunicateTestSayHello = {
  readonly methodName: string;
  readonly service: typeof CommunicateTest;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_communicate_pb.HelloRequest;
  readonly responseType: typeof proto_communicate_pb.HelloReply;
};

type CommunicateTestNotification = {
  readonly methodName: string;
  readonly service: typeof CommunicateTest;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof proto_communicate_pb.NotificationRequest;
  readonly responseType: typeof proto_communicate_pb.NotificationReply;
};

type CommunicateTestUpload = {
  readonly methodName: string;
  readonly service: typeof CommunicateTest;
  readonly requestStream: true;
  readonly responseStream: false;
  readonly requestType: typeof proto_communicate_pb.UploadRequest;
  readonly responseType: typeof proto_communicate_pb.UploadReply;
};

type CommunicateTestChat = {
  readonly methodName: string;
  readonly service: typeof CommunicateTest;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof proto_communicate_pb.ChatRequest;
  readonly responseType: typeof proto_communicate_pb.ChatReply;
};

export class CommunicateTest {
  static readonly serviceName: string;
  static readonly SayHello: CommunicateTestSayHello;
  static readonly Notification: CommunicateTestNotification;
  static readonly Upload: CommunicateTestUpload;
  static readonly Chat: CommunicateTestChat;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class CommunicateTestClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  sayHello(
    requestMessage: proto_communicate_pb.HelloRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_communicate_pb.HelloReply|null) => void
  ): UnaryResponse;
  sayHello(
    requestMessage: proto_communicate_pb.HelloRequest,
    callback: (error: ServiceError|null, responseMessage: proto_communicate_pb.HelloReply|null) => void
  ): UnaryResponse;
  notification(requestMessage: proto_communicate_pb.NotificationRequest, metadata?: grpc.Metadata): ResponseStream<proto_communicate_pb.NotificationReply>;
  upload(metadata?: grpc.Metadata): RequestStream<proto_communicate_pb.UploadRequest>;
  chat(metadata?: grpc.Metadata): BidirectionalStream<proto_communicate_pb.ChatRequest, proto_communicate_pb.ChatReply>;
}

