// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_rtc_pb = require('../proto/rtc_pb.js');

function serialize_rtc_Reply(arg) {
  if (!(arg instanceof proto_rtc_pb.Reply)) {
    throw new Error('Expected argument of type rtc.Reply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rtc_Reply(buffer_arg) {
  return proto_rtc_pb.Reply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_rtc_Request(arg) {
  if (!(arg instanceof proto_rtc_pb.Request)) {
    throw new Error('Expected argument of type rtc.Request');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rtc_Request(buffer_arg) {
  return proto_rtc_pb.Request.deserializeBinary(new Uint8Array(buffer_arg));
}


var RTCService = exports.RTCService = {
  signal: {
    path: '/rtc.RTC/Signal',
    requestStream: true,
    responseStream: true,
    requestType: proto_rtc_pb.Request,
    responseType: proto_rtc_pb.Reply,
    requestSerialize: serialize_rtc_Request,
    requestDeserialize: deserialize_rtc_Request,
    responseSerialize: serialize_rtc_Reply,
    responseDeserialize: deserialize_rtc_Reply,
  },
};

exports.RTCClient = grpc.makeGenericClientConstructor(RTCService);
