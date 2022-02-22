// package: edocontroller
// file: proto/edo.proto

import * as jspb from "google-protobuf";

export class GetDevicesRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDevicesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetDevicesRequest): GetDevicesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetDevicesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDevicesRequest;
  static deserializeBinaryFromReader(message: GetDevicesRequest, reader: jspb.BinaryReader): GetDevicesRequest;
}

export namespace GetDevicesRequest {
  export type AsObject = {
  }
}

export class GetDevicesResponse extends jspb.Message {
  getDevicesMap(): jspb.Map<string, string>;
  clearDevicesMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDevicesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetDevicesResponse): GetDevicesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetDevicesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDevicesResponse;
  static deserializeBinaryFromReader(message: GetDevicesResponse, reader: jspb.BinaryReader): GetDevicesResponse;
}

export namespace GetDevicesResponse {
  export type AsObject = {
    devicesMap: Array<[string, string]>,
  }
}

export class AddDeviceRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddDeviceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddDeviceRequest): AddDeviceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddDeviceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddDeviceRequest;
  static deserializeBinaryFromReader(message: AddDeviceRequest, reader: jspb.BinaryReader): AddDeviceRequest;
}

export namespace AddDeviceRequest {
  export type AsObject = {
    name: string,
  }
}

export class AddDeviceResponse extends jspb.Message {
  getDevid(): string;
  setDevid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddDeviceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddDeviceResponse): AddDeviceResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddDeviceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddDeviceResponse;
  static deserializeBinaryFromReader(message: AddDeviceResponse, reader: jspb.BinaryReader): AddDeviceResponse;
}

export namespace AddDeviceResponse {
  export type AsObject = {
    devid: string,
  }
}

export class ControlleRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getCommand(): string;
  setCommand(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ControlleRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ControlleRequest): ControlleRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ControlleRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ControlleRequest;
  static deserializeBinaryFromReader(message: ControlleRequest, reader: jspb.BinaryReader): ControlleRequest;
}

export namespace ControlleRequest {
  export type AsObject = {
    name: string,
    command: string,
  }
}

export class ControlleResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ControlleResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ControlleResponse): ControlleResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ControlleResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ControlleResponse;
  static deserializeBinaryFromReader(message: ControlleResponse, reader: jspb.BinaryReader): ControlleResponse;
}

export namespace ControlleResponse {
  export type AsObject = {
    result: string,
  }
}

export class ExControllerRequest extends jspb.Message {
  getCid(): string;
  setCid(value: string): void;

  getCommand(): string;
  setCommand(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExControllerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ExControllerRequest): ExControllerRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExControllerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExControllerRequest;
  static deserializeBinaryFromReader(message: ExControllerRequest, reader: jspb.BinaryReader): ExControllerRequest;
}

export namespace ExControllerRequest {
  export type AsObject = {
    cid: string,
    command: string,
  }
}

export class ExControllerResponse extends jspb.Message {
  getCid(): string;
  setCid(value: string): void;

  getResult(): string;
  setResult(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExControllerResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ExControllerResponse): ExControllerResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExControllerResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExControllerResponse;
  static deserializeBinaryFromReader(message: ExControllerResponse, reader: jspb.BinaryReader): ExControllerResponse;
}

export namespace ExControllerResponse {
  export type AsObject = {
    cid: string,
    result: string,
  }
}

