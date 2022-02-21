const EventEmitter = require('events');
const fetch = require('node-fetch');
const pb = require('./proto/rtc_pb')
const sfu_rpc = require('./proto/rtc_grpc_pb')


var grpc = require('@grpc/grpc-js');

class IonSFUGRPCSignal {
    ontrickle = undefined;
    constructor(uri, metadata){
        this._event = new EventEmitter();
        //client
        const client = new sfu_rpc.RTCClient(uri,
                                           grpc.credentials.createInsecure());
        this.client = client;

        const call = client.signal();

        // message
        call.on('data', (reply) => {
            //message type
            console.log("get message")
            switch (reply.getPayloadCase()){
                case pb.Reply.PayloadCase.JOIN:
                    console.log("join")
                    const result = reply.getJoin();
                    console.log(result)
                    this._event.emit('join-reply', result);
                    //this._event.emit('join-reply', result);
                    break;
                case pb.Reply.PayloadCase.DESCRIPTION:
                    console.log("description")
                    const desc = reply.getDescription();
                    if (desc?.getType() === 'offer') {
                        console.log("offer")
                        //if (this.onnegotiate) this.onnegotiate({ sdp: desc.getSdp(), type: 'offer' });
                    } else if (desc?.getType() === 'answer') {
                        console.log("answer")
                        //this._event.emit('description', { sdp: desc.getSdp(), type: 'answer' });
                    }
                    if (desc?.getTrackinfosList() && desc?.getTrackinfosList().length > 0) {
                        // TODO: process metadata.
                    }
                    break;
                case pb.Reply.PayloadCase.TRICKLE:
                    console.log("trickle")
                    const pbTrickle = reply.getTrickle();
                    if (pbTrickle.getInit() !== undefined) {
                        const candidate = JSON.parse(pbTrickle.getInit());
                        const trickle = { target: pbTrickle.getTarget(), candidate };
                        if (this.ontrickle) this.ontrickle(trickle);
                    }
                    break;
                case pb.Reply.PayloadCase.TRACKEVENT:
                    console.log("track event")
                    break;
                case pb.Reply.PayloadCase.SUBSCRIPTION:
                    console.log("subscription")
                    break;
                case pb.Reply.PayloadCase.ERROR:
                    console.log("error")
                    break;
            }
            //console.log('Got message "' + message.getMessage())
        });

        this.call = call
    }

    //sid: string, uid: string, offer: RTCSessionDescriptionInit
    async join(sid, uid, offer) {

        const request = new pb.Request();
        const join = new pb.JoinRequest();
        join.setSid(sid);
        join.setUid(uid || '');
        //TODO
        //if (this._config) {
        //    join.getConfigMap().set('NoPublish', this._config?.no_publish ? 'true' : 'false');
        //    join.getConfigMap().set('NoSubscribe', this._config?.no_subscribe ? 'true' : 'false');
        //    join.getConfigMap().set('NoAutoSubscribe', this._config?.no_auto_subscribe ? 'true' : 'false');
        //}
        join.getConfigMap().set('NoPublish',  'false');
        join.getConfigMap().set('NoSubscribe', 'false');
        join.getConfigMap().set('NoAutoSubscribe', "false")
        console.log("offer")
        console.log(offer.sdp)
        console.log(offer.type)

        const dest = new pb.SessionDescription();
        dest.setSdp(offer.sdp || '');
        dest.setType(offer.type || '');
        dest.setTarget(pb.Target.PUBLISHER);
        if (this._tracksInfos) {
            dest.setTrackinfosList(this._tracksInfos);
        }
        join.setDescription(dest);
        request.setJoin(join);


        this.call.write(request);

        //return null

        return new Promise((resolve, reject) => {
            const handler = (result) => {
                if (result.getSuccess()) {
                    resolve({
                        sdp: result.getDescription().getSdp(),
                        type: result.getDescription().getType()
                    });
                } else {
                    reject(result.getError()?.toObject());
                }
                this._event.removeListener('join-reply', handler);
            };
            this._event.addListener('join-reply', handler);
        });
    }

    trickle(trickle) {
        const request = new pb.Request();
        const pbTrickle = new pb.Trickle();
        pbTrickle.setInit(JSON.stringify(trickle));
        request.setTrickle(pbTrickle);
        this.call.write(request);
    }
    
}

module.exports = IonSFUGRPCSignal;