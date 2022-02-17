import {grpc} from "@improbable-eng/grpc-web";
import {CommunicateTest} from "./proto/communicate_pb_service"
import {HelloRequest} from "./proto/communicate_pb"

import React from "react";

const host = "http://127.0.0.1:8080";



class App extends React.Component {
  handleClick() {
    console.log("hello")
    const helloRequest = new HelloRequest();
    helloRequest.setName("hello")
    grpc.unary(CommunicateTest.SayHello, {
      request: helloRequest,
      host: host,
      onEnd: res => {
        const { status, statusMessage, headers, message, trailers } = res;
        console.log("hello.onEnd.status", status, statusMessage);
        console.log("hello.onEnd.headers", headers);
        if (status === grpc.Code.OK && message) {
          console.log("hello.onEnd.message", message.toObject());
        }
        console.log("hello.onEnd.trailers", trailers);
      }
    });
  }
  render() {
    return (
      <div className="App">
      <p>Hello world</p>
      <button onClick={this.handleClick}>Hello</button>
      </div>
    );
  }
}

export default App;