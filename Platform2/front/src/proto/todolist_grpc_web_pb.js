/**
 * @fileoverview gRPC-Web generated client stub for todolistProto
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.todolistProto = require('./todolist_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.todolistProto.TodoListServiceClient =
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
proto.todolistProto.TodoListServicePromiseClient =
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
 *   !proto.todolistProto.SignInRequest,
 *   !proto.todolistProto.SignInReply>}
 */
const methodDescriptor_TodoListService_SignIn = new grpc.web.MethodDescriptor(
  '/todolistProto.TodoListService/SignIn',
  grpc.web.MethodType.UNARY,
  proto.todolistProto.SignInRequest,
  proto.todolistProto.SignInReply,
  /**
   * @param {!proto.todolistProto.SignInRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.todolistProto.SignInReply.deserializeBinary
);


/**
 * @param {!proto.todolistProto.SignInRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.todolistProto.SignInReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.todolistProto.SignInReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.todolistProto.TodoListServiceClient.prototype.signIn =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/todolistProto.TodoListService/SignIn',
      request,
      metadata || {},
      methodDescriptor_TodoListService_SignIn,
      callback);
};


/**
 * @param {!proto.todolistProto.SignInRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.todolistProto.SignInReply>}
 *     Promise that resolves to the response
 */
proto.todolistProto.TodoListServicePromiseClient.prototype.signIn =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/todolistProto.TodoListService/SignIn',
      request,
      metadata || {},
      methodDescriptor_TodoListService_SignIn);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.todolistProto.SignUpRequest,
 *   !proto.todolistProto.SignUpReply>}
 */
const methodDescriptor_TodoListService_SignUp = new grpc.web.MethodDescriptor(
  '/todolistProto.TodoListService/SignUp',
  grpc.web.MethodType.UNARY,
  proto.todolistProto.SignUpRequest,
  proto.todolistProto.SignUpReply,
  /**
   * @param {!proto.todolistProto.SignUpRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.todolistProto.SignUpReply.deserializeBinary
);


/**
 * @param {!proto.todolistProto.SignUpRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.todolistProto.SignUpReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.todolistProto.SignUpReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.todolistProto.TodoListServiceClient.prototype.signUp =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/todolistProto.TodoListService/SignUp',
      request,
      metadata || {},
      methodDescriptor_TodoListService_SignUp,
      callback);
};


/**
 * @param {!proto.todolistProto.SignUpRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.todolistProto.SignUpReply>}
 *     Promise that resolves to the response
 */
proto.todolistProto.TodoListServicePromiseClient.prototype.signUp =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/todolistProto.TodoListService/SignUp',
      request,
      metadata || {},
      methodDescriptor_TodoListService_SignUp);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.todolistProto.UserInfoRequest,
 *   !proto.todolistProto.UserInfoReply>}
 */
const methodDescriptor_TodoListService_UserInfo = new grpc.web.MethodDescriptor(
  '/todolistProto.TodoListService/UserInfo',
  grpc.web.MethodType.UNARY,
  proto.todolistProto.UserInfoRequest,
  proto.todolistProto.UserInfoReply,
  /**
   * @param {!proto.todolistProto.UserInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.todolistProto.UserInfoReply.deserializeBinary
);


/**
 * @param {!proto.todolistProto.UserInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.todolistProto.UserInfoReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.todolistProto.UserInfoReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.todolistProto.TodoListServiceClient.prototype.userInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/todolistProto.TodoListService/UserInfo',
      request,
      metadata || {},
      methodDescriptor_TodoListService_UserInfo,
      callback);
};


/**
 * @param {!proto.todolistProto.UserInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.todolistProto.UserInfoReply>}
 *     Promise that resolves to the response
 */
proto.todolistProto.TodoListServicePromiseClient.prototype.userInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/todolistProto.TodoListService/UserInfo',
      request,
      metadata || {},
      methodDescriptor_TodoListService_UserInfo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.todolistProto.NotificationRequest,
 *   !proto.todolistProto.NotificationReply>}
 */
const methodDescriptor_TodoListService_Notification = new grpc.web.MethodDescriptor(
  '/todolistProto.TodoListService/Notification',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.todolistProto.NotificationRequest,
  proto.todolistProto.NotificationReply,
  /**
   * @param {!proto.todolistProto.NotificationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.todolistProto.NotificationReply.deserializeBinary
);


/**
 * @param {!proto.todolistProto.NotificationRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.todolistProto.NotificationReply>}
 *     The XHR Node Readable Stream
 */
proto.todolistProto.TodoListServiceClient.prototype.notification =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/todolistProto.TodoListService/Notification',
      request,
      metadata || {},
      methodDescriptor_TodoListService_Notification);
};


/**
 * @param {!proto.todolistProto.NotificationRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.todolistProto.NotificationReply>}
 *     The XHR Node Readable Stream
 */
proto.todolistProto.TodoListServicePromiseClient.prototype.notification =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/todolistProto.TodoListService/Notification',
      request,
      metadata || {},
      methodDescriptor_TodoListService_Notification);
};


module.exports = proto.todolistProto;

