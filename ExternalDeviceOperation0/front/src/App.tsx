import {grpc} from "@improbable-eng/grpc-web";
import {EdoService} from "./proto/edo_pb_service"
import {GetDevicesRequest, AddDeviceRequest, ControlleRequest} from "./proto/edo_pb"

import React from 'react';
import './App.css';

const host = "http://127.0.0.1:50051";


interface Props {
}

interface State {
  dev_name: string
  devlist : string[][]
  send_dev_name : string
  send_command: string
}


interface DevList {
  devicesMap: string[][]
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {dev_name: '', devlist: [], send_dev_name:'', send_command:''};

    this.GetDevicesClick = this.GetDevicesClick.bind(this);
    this.AddDevice = this.AddDevice.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChangeCommand = this.handleChangeCommand.bind(this);
    this.SendCommand = this.SendCommand.bind(this);
  }
  GetDevicesClick() {
    console.log("get device")
    const getDevicesRequest = new GetDevicesRequest();
    grpc.unary(EdoService.GetDevices, {
      request: getDevicesRequest,
      host: host,
      onEnd: res => {
        const { status, statusMessage, headers, message, trailers } = res;
        console.log("getDevices.onEnd.status", status, statusMessage);
        console.log("getDevices.onEnd.headers", headers);
        if (status === grpc.Code.OK && message) {
          console.log("getDevices.onEnd.message", message.toObject()) ;
          const dev_list =  message.toObject() as DevList
          console.log(dev_list.devicesMap);
          this.setState({devlist:dev_list.devicesMap});
          //const listItems = dev_list.map((dev) =>
          //  <li key={dev[0]}>
          //    {dev[0]}
          //  </li>
          //);
        }
        console.log("getDevices.onEnd.trailers", trailers);
      }
    });
  }
  AddDevice(){
    const addDeviceRequest = new AddDeviceRequest();
    addDeviceRequest.setName(this.state.dev_name);
    console.log("addDevice:", this.state.dev_name)

    grpc.unary(EdoService.AddDevice, {
      request: addDeviceRequest,
      host: host,
      onEnd: res => {
        const { status, statusMessage, headers, message, trailers } = res;
        console.log("getDevices.onEnd.status", status, statusMessage);
        console.log("getDevices.onEnd.headers", headers);
        if (status === grpc.Code.OK && message) {
          console.log("getDevices.onEnd.message", message.toObject());
        }
        console.log("getDevices.onEnd.trailers", trailers);
      }
    });
  }
  handleChangeName(event: React.ChangeEvent<HTMLInputElement>){
    this.setState({dev_name:event.target.value})
  }

  handleChangeSelect(event: any ){
    console.log(event.target.value)
    this.setState({send_dev_name:event.target.value})
  }

  handleChangeCommand(event: React.ChangeEvent<HTMLInputElement>){
    this.setState({send_command:event.target.value})
  }

  SendCommand(){
    const controlleRequest = new ControlleRequest();
    controlleRequest.setName(this.state.send_dev_name);
    controlleRequest.setCommand(this.state.send_command)

    console.log(this.state.send_dev_name)
    console.log(this.state.send_command)

    grpc.unary(EdoService.Controller, {
      request: controlleRequest,
      host: host,
      onEnd: res => {
        const { status, statusMessage, headers, message, trailers } = res;
        console.log("getDevices.onEnd.status", status, statusMessage);
        console.log("getDevices.onEnd.headers", headers);
        if (status === grpc.Code.OK && message) {
          console.log("getDevices.onEnd.message", message.toObject());
        }
        console.log("getDevices.onEnd.trailers", trailers);
      }
    });
  }


  render() {
    return (
      <div className="App">
      <h3>GetDevices</h3>
      <button onClick={this.GetDevicesClick}>GetDevices</button>
      <h3>AddDevice</h3>
      <input type="text" value={this.state.dev_name} onChange={this.handleChangeName} />
      <button onClick={this.AddDevice}>Add</button>
      <h3>Send Command</h3>
      <select value={this.state.send_dev_name} onChange={this.handleChangeSelect}>
        {
          this.state.devlist.map((dev) =>{
            console.log(dev)
            return (
              <option value={dev[0]} key={dev[1]}>{dev[0]}</option>
            )
          })
        }
      </select>
      <input type="text" value={this.state.send_command} onChange={this.handleChangeCommand} />
      <button onClick={this.SendCommand}>Send Command</button>
      

      </div>
    );
  }
}

export default App;
