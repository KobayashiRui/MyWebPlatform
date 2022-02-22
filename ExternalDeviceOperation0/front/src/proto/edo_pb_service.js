// package: edocontroller
// file: proto/edo.proto

var proto_edo_pb = require("../proto/edo_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var EdoService = (function () {
  function EdoService() {}
  EdoService.serviceName = "edocontroller.EdoService";
  return EdoService;
}());

EdoService.AddDevice = {
  methodName: "AddDevice",
  service: EdoService,
  requestStream: false,
  responseStream: false,
  requestType: proto_edo_pb.AddDeviceRequest,
  responseType: proto_edo_pb.AddDeviceResponse
};

EdoService.GetDevices = {
  methodName: "GetDevices",
  service: EdoService,
  requestStream: false,
  responseStream: false,
  requestType: proto_edo_pb.GetDevicesRequest,
  responseType: proto_edo_pb.GetDevicesResponse
};

EdoService.Controller = {
  methodName: "Controller",
  service: EdoService,
  requestStream: false,
  responseStream: false,
  requestType: proto_edo_pb.ControlleRequest,
  responseType: proto_edo_pb.ControlleResponse
};

EdoService.ExController = {
  methodName: "ExController",
  service: EdoService,
  requestStream: true,
  responseStream: true,
  requestType: proto_edo_pb.ExControllerResponse,
  responseType: proto_edo_pb.ExControllerRequest
};

exports.EdoService = EdoService;

function EdoServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

EdoServiceClient.prototype.addDevice = function addDevice(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EdoService.AddDevice, {
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

EdoServiceClient.prototype.getDevices = function getDevices(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EdoService.GetDevices, {
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

EdoServiceClient.prototype.controller = function controller(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EdoService.Controller, {
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

EdoServiceClient.prototype.exController = function exController(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(EdoService.ExController, {
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

exports.EdoServiceClient = EdoServiceClient;

