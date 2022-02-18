import React from 'react';
import './App.css';
import {Service, Connector, RTC} from 'ion-sdk-js/lib/connector';
import { Client, LocalStream, RemoteStream, Constraints} from 'ion-sdk-js';
import { IonSFUGRPCWebSignal } from 'ion-sdk-js/lib/signal/grpc-web-impl';

interface Props {
}

interface State {
  rtc : RTC
  connector : Connector
  streams : { [key: string]: RemoteStream; }
  //localDataChannel : RTCDataChannel|undefined
}

class App extends React.Component<Props, State> {
  private localVideo = React.createRef<HTMLVideoElement>()
  private remoteVideo = React.createRef<HTMLVideoElement>()

  constructor(props: Props) {
    super(props);
    const url = 'http://localhost:50051';
    const connector = new Connector(url, "token");
    const rtc = new RTC(connector);
    //todo null state
    this.state = {connector: connector, rtc: rtc, streams: {}}

    this.joinClick = this.joinClick.bind(this)
    this.start = this.start.bind(this)
  }

  async joinClick() {
    this.state.rtc.join("ion", "hoge", undefined);
    this.state.connector.onopen = (service) => {
      console.log("[onopen]: service = ", service.name);
    }

    this.state.connector.onclose = (service) => {
      console.log('[onclose]: service = ' + service.name);
    }

    this.state.rtc.ontrack = (track, stream) => {
      console.log("got ", track.kind, " track", track.id, "for stream", stream.id);
      if (track.kind === "video") {
        track.onunmute = () => {
          if (!this.state.streams[stream.id]) {
            //const remoteVideo = document.createElement("video");
            this.remoteVideo.current!.srcObject = stream;
            this.remoteVideo.current!.autoplay = true;
            this.remoteVideo.current!.muted = true;
            //this.remoteVideo.current!.addEventListener("loadedmetadata", function () {
            //  sizeTag.innerHTML = `${remoteVideo.videoWidth}x${remoteVideo.videoHeight}`;
            //});
    
            //this.remoteVideo.current!.onresize = function () {
            //  sizeTag.innerHTML = `${remoteVideo.videoWidth}x${remoteVideo.videoHeight}`;
            //};
            //remotesDiv.appendChild(remoteVideo);
            this.state.streams[stream.id] = stream;
            stream.onremovetrack = () => {
              if (this.state.streams[stream.id]) {
                //remotesDiv.removeChild(remoteVideo);
                delete this.state.streams[stream.id];
              }
            };
            //getStats();
          }
        };
      }
    };

    this.state.rtc.ontrackevent = (ev) => {
      console.log("ontrackevent: \nuid = ", ev.uid, " \nstate = ", ev.state, ", \ntracks = ", JSON.stringify(ev.tracks));
      //if (this.state.trackEvent === undefined) {
      //  console.log("store trackEvent=", ev)
      //  this.state.trackEvent = ev;
      //}
      //remoteSignal.innerHTML = remoteSignal.innerHTML + JSON.stringify(ev) + '\n';
    };

  }

  start(){
    const constraints: Constraints = {
      resolution: 'hd',
      codec: 'vp8',
      audio: true,
      video: true,
      simulcast: false,
    }

    console.log("getUserMedia constraints=", constraints)    

    LocalStream.getUserMedia(constraints)
      .then((media) => {
        //localStream = media;
        this.localVideo.current!.srcObject = media;
        this.localVideo.current!.autoplay = true;
        this.localVideo.current!.controls = true;
        this.localVideo.current!.muted = true;

        this.state.rtc.publish(media);
        //this.state.localDataChannel = 
        this.state.rtc.createDataChannel("hoge");
      })
      .catch(console.error);


  }

  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
        <button onClick={this.joinClick}>Join</button>
        <button onClick={this.start}>Publish</button>
        <video controls muted ref={this.localVideo} width="320" height="240"></video>
        <video controls muted ref={this.remoteVideo} width="320" height="240"></video>
      </div>
    )

  }
}

export default App;
