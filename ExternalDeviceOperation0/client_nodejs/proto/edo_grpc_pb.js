// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_edo_pb = require('../proto/edo_pb.js');

function serialize_edocontroller_AddDeviceRequest(arg) {
  if (!(arg instanceof proto_edo_pb.AddDeviceRequest)) {
    throw new Error('Expected argument of type edocontroller.AddDeviceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edocontroller_AddDeviceRequest(buffer_arg) {
  return proto_edo_pb.AddDeviceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edocontroller_AddDeviceResponse(arg) {
  if (!(arg instanceof proto_edo_pb.AddDeviceResponse)) {
    throw new Error('Expected argument of type edocontroller.AddDeviceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edocontroller_AddDeviceResponse(buffer_arg) {
  return proto_edo_pb.AddDeviceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edocontroller_ControlleRequest(arg) {
  if (!(arg instanceof proto_edo_pb.ControlleRequest)) {
    throw new Error('Expected argument of type edocontroller.ControlleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edocontroller_ControlleRequest(buffer_arg) {
  return proto_edo_pb.ControlleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edocontroller_ControlleResponse(arg) {
  if (!(arg instanceof proto_edo_pb.ControlleResponse)) {
    throw new Error('Expected argument of type edocontroller.ControlleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edocontroller_ControlleResponse(buffer_arg) {
  return proto_edo_pb.ControlleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edocontroller_ExControllerRequest(arg) {
  if (!(arg instanceof proto_edo_pb.ExControllerRequest)) {
    throw new Error('Expected argument of type edocontroller.ExControllerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edocontroller_ExControllerRequest(buffer_arg) {
  return proto_edo_pb.ExControllerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edocontroller_ExControllerResponse(arg) {
  if (!(arg instanceof proto_edo_pb.ExControllerResponse)) {
    throw new Error('Expected argument of type edocontroller.ExControllerResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edocontroller_ExControllerResponse(buffer_arg) {
  return proto_edo_pb.ExControllerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edocontroller_GetDevicesRequest(arg) {
  if (!(arg instanceof proto_edo_pb.GetDevicesRequest)) {
    throw new Error('Expected argument of type edocontroller.GetDevicesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edocontroller_GetDevicesRequest(buffer_arg) {
  return proto_edo_pb.GetDevicesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_edocontroller_GetDevicesResponse(arg) {
  if (!(arg instanceof proto_edo_pb.GetDevicesResponse)) {
    throw new Error('Expected argument of type edocontroller.GetDevicesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_edocontroller_GetDevicesResponse(buffer_arg) {
  return proto_edo_pb.GetDevicesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var EdoServiceService = exports.EdoServiceService = {
  addDevice: {
    path: '/edocontroller.EdoService/AddDevice',
    requestStream: false,
    responseStream: false,
    requestType: proto_edo_pb.AddDeviceRequest,
    responseType: proto_edo_pb.AddDeviceResponse,
    requestSerialize: serialize_edocontroller_AddDeviceRequest,
    requestDeserialize: deserialize_edocontroller_AddDeviceRequest,
    responseSerialize: serialize_edocontroller_AddDeviceResponse,
    responseDeserialize: deserialize_edocontroller_AddDeviceResponse,
  },
  getDevices: {
    path: '/edocontroller.EdoService/GetDevices',
    requestStream: false,
    responseStream: false,
    requestType: proto_edo_pb.GetDevicesRequest,
    responseType: proto_edo_pb.GetDevicesResponse,
    requestSerialize: serialize_edocontroller_GetDevicesRequest,
    requestDeserialize: deserialize_edocontroller_GetDevicesRequest,
    responseSerialize: serialize_edocontroller_GetDevicesResponse,
    responseDeserialize: deserialize_edocontroller_GetDevicesResponse,
  },
  controller: {
    path: '/edocontroller.EdoService/Controller',
    requestStream: false,
    responseStream: false,
    requestType: proto_edo_pb.ControlleRequest,
    responseType: proto_edo_pb.ControlleResponse,
    requestSerialize: serialize_edocontroller_ControlleRequest,
    requestDeserialize: deserialize_edocontroller_ControlleRequest,
    responseSerialize: serialize_edocontroller_ControlleResponse,
    responseDeserialize: deserialize_edocontroller_ControlleResponse,
  },
  exController: {
    path: '/edocontroller.EdoService/ExController',
    requestStream: true,
    responseStream: true,
    requestType: proto_edo_pb.ExControllerResponse,
    responseType: proto_edo_pb.ExControllerRequest,
    requestSerialize: serialize_edocontroller_ExControllerResponse,
    requestDeserialize: deserialize_edocontroller_ExControllerResponse,
    responseSerialize: serialize_edocontroller_ExControllerRequest,
    responseDeserialize: deserialize_edocontroller_ExControllerRequest,
  },
};

exports.EdoServiceClient = grpc.makeGenericClientConstructor(EdoServiceService);
