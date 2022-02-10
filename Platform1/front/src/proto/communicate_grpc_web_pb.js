/**
 * @fileoverview gRPC-Web generated client stub for communicate
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.communicate = require('./communicate_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.communicate.CommunicateTestClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.communicate.CommunicateTestPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communicate.HelloRequest,
 *   !proto.communicate.HelloReply>}
 */
const methodDescriptor_CommunicateTest_SayHello = new grpc.web.MethodDescriptor(
  '/communicate.CommunicateTest/SayHello',
  grpc.web.MethodType.UNARY,
  proto.communicate.HelloRequest,
  proto.communicate.HelloReply,
  /**
   * @param {!proto.communicate.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.communicate.HelloReply.deserializeBinary
);


/**
 * @param {!proto.communicate.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communicate.HelloReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communicate.HelloReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communicate.CommunicateTestClient.prototype.sayHello =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communicate.CommunicateTest/SayHello',
      request,
      metadata || {},
      methodDescriptor_CommunicateTest_SayHello,
      callback);
};


/**
 * @param {!proto.communicate.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communicate.HelloReply>}
 *     Promise that resolves to the response
 */
proto.communicate.CommunicateTestPromiseClient.prototype.sayHello =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communicate.CommunicateTest/SayHello',
      request,
      metadata || {},
      methodDescriptor_CommunicateTest_SayHello);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communicate.NotificationRequest,
 *   !proto.communicate.NotificationReply>}
 */
const methodDescriptor_CommunicateTest_Notification = new grpc.web.MethodDescriptor(
  '/communicate.CommunicateTest/Notification',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.communicate.NotificationRequest,
  proto.communicate.NotificationReply,
  /**
   * @param {!proto.communicate.NotificationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.communicate.NotificationReply.deserializeBinary
);


/**
 * @param {!proto.communicate.NotificationRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.communicate.NotificationReply>}
 *     The XHR Node Readable Stream
 */
proto.communicate.CommunicateTestClient.prototype.notification =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/communicate.CommunicateTest/Notification',
      request,
      metadata || {},
      methodDescriptor_CommunicateTest_Notification);
};


/**
 * @param {!proto.communicate.NotificationRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.communicate.NotificationReply>}
 *     The XHR Node Readable Stream
 */
proto.communicate.CommunicateTestPromiseClient.prototype.notification =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/communicate.CommunicateTest/Notification',
      request,
      metadata || {},
      methodDescriptor_CommunicateTest_Notification);
};


module.exports = proto.communicate;

