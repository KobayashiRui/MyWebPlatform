/* eslint-disable */
// package: communicate
// file: proto/communicate.proto

var proto_communicate_pb = require("../proto/communicate_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var CommunicateTest = (function () {
  function CommunicateTest() {}
  CommunicateTest.serviceName = "communicate.CommunicateTest";
  return CommunicateTest;
}());

CommunicateTest.SayHello = {
  methodName: "SayHello",
  service: CommunicateTest,
  requestStream: false,
  responseStream: false,
  requestType: proto_communicate_pb.HelloRequest,
  responseType: proto_communicate_pb.HelloReply
};

CommunicateTest.Notification = {
  methodName: "Notification",
  service: CommunicateTest,
  requestStream: false,
  responseStream: true,
  requestType: proto_communicate_pb.NotificationRequest,
  responseType: proto_communicate_pb.NotificationReply
};

CommunicateTest.Upload = {
  methodName: "Upload",
  service: CommunicateTest,
  requestStream: true,
  responseStream: false,
  requestType: proto_communicate_pb.UploadRequest,
  responseType: proto_communicate_pb.UploadReply
};

CommunicateTest.Chat = {
  methodName: "Chat",
  service: CommunicateTest,
  requestStream: true,
  responseStream: true,
  requestType: proto_communicate_pb.ChatRequest,
  responseType: proto_communicate_pb.ChatReply
};

exports.CommunicateTest = CommunicateTest;

function CommunicateTestClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CommunicateTestClient.prototype.sayHello = function sayHello(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CommunicateTest.SayHello, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CommunicateTestClient.prototype.notification = function notification(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(CommunicateTest.Notification, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

CommunicateTestClient.prototype.upload = function upload(metadata) {
  var listeners = {
    end: [],
    status: []
  };
  var client = grpc.client(CommunicateTest.Upload, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      if (!client.started) {
        client.start(metadata);
      }
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

CommunicateTestClient.prototype.chat = function chat(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(CommunicateTest.Chat, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.CommunicateTestClient = CommunicateTestClient;

