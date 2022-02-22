// package: edocontroller
// file: proto/edo.proto

import * as proto_edo_pb from "../proto/edo_pb";
import {grpc} from "@improbable-eng/grpc-web";

type EdoServiceAddDevice = {
  readonly methodName: string;
  readonly service: typeof EdoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_edo_pb.AddDeviceRequest;
  readonly responseType: typeof proto_edo_pb.AddDeviceResponse;
};

type EdoServiceGetDevices = {
  readonly methodName: string;
  readonly service: typeof EdoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_edo_pb.GetDevicesRequest;
  readonly responseType: typeof proto_edo_pb.GetDevicesResponse;
};

type EdoServiceController = {
  readonly methodName: string;
  readonly service: typeof EdoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_edo_pb.ControlleRequest;
  readonly responseType: typeof proto_edo_pb.ControlleResponse;
};

type EdoServiceExController = {
  readonly methodName: string;
  readonly service: typeof EdoService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof proto_edo_pb.ExControllerResponse;
  readonly responseType: typeof proto_edo_pb.ExControllerRequest;
};

export class EdoService {
  static readonly serviceName: string;
  static readonly AddDevice: EdoServiceAddDevice;
  static readonly GetDevices: EdoServiceGetDevices;
  static readonly Controller: EdoServiceController;
  static readonly ExController: EdoServiceExController;
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

export class EdoServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  addDevice(
    requestMessage: proto_edo_pb.AddDeviceRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_edo_pb.AddDeviceResponse|null) => void
  ): UnaryResponse;
  addDevice(
    requestMessage: proto_edo_pb.AddDeviceRequest,
    callback: (error: ServiceError|null, responseMessage: proto_edo_pb.AddDeviceResponse|null) => void
  ): UnaryResponse;
  getDevices(
    requestMessage: proto_edo_pb.GetDevicesRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_edo_pb.GetDevicesResponse|null) => void
  ): UnaryResponse;
  getDevices(
    requestMessage: proto_edo_pb.GetDevicesRequest,
    callback: (error: ServiceError|null, responseMessage: proto_edo_pb.GetDevicesResponse|null) => void
  ): UnaryResponse;
  controller(
    requestMessage: proto_edo_pb.ControlleRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_edo_pb.ControlleResponse|null) => void
  ): UnaryResponse;
  controller(
    requestMessage: proto_edo_pb.ControlleRequest,
    callback: (error: ServiceError|null, responseMessage: proto_edo_pb.ControlleResponse|null) => void
  ): UnaryResponse;
  exController(metadata?: grpc.Metadata): BidirectionalStream<proto_edo_pb.ExControllerResponse, proto_edo_pb.ExControllerRequest>;
}

