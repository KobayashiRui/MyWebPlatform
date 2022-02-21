const fetch = require('node-fetch');

class Client {
    constructor(signal){
        this.signal = signal;
        this.srvurl = "http://localhost:8000";
        //this.videourl = "rtsp://97.68.104.34/axis-media/media.amp"
        this.videourl="Allendale"
        //this.videourl = "rtsp://71.83.5.156/axis-media/media.amp"

        this.candidates = [];

        this.join.bind(this);

        signal.ontrickle = this.trickle.bind(this);

    }
    async join(sid, uid){
        //create offer

        this.peerid = Math.random().toString();

        var createOfferUrl = this.srvurl + "/api/createOffer?peerid="+ this.peerid +"&url="+encodeURIComponent(this.videourl) + "&options=rtptransport%3Dtcp%26timeout%3D60";
        //var createOfferUrl = this.srvurl + "/api/createOffer?peerid="+ this.peerid +"&video="+"Orlando";

        console.log("fetch:" + createOfferUrl)
        const responseOffer = await fetch(createOfferUrl)
        const offer = await responseOffer.json();

        console.log(offer)

        const answer = await this.signal.join(sid, uid, offer);

        console.log(answer)
        //set answer
        console.log("get answer")
        const answerUrl = this.srvurl + "/api/setAnswer?peerid=" + this.peerid
        const responseAnswer = await fetch(answerUrl, { method: "POST", body: JSON.stringify(answer)})
        //send answer

        //send candidate from webrtc-streamer
        const getCandidateURL = this.srvurl + "/api/getIceCandidate?peerid=" + this.peerid
        const responseCandidate = await fetch(getCandidateURL)
        const getCandidateList = await responseCandidate.json()

        getCandidateList.forEach(async (c) => {
            console.log("Candidate")
            console.log(c)
            this.signal.trickle(c)
        })

        //add candidate to webrtc-streamer
        const addCandidateURL = this.srvurl + "/api/addIceCandidate?peerid=" + this.peerid
        this.candidates.forEach(async (c) => {
            let res = await fetch(addCandidateURL, { method: "POST", body: JSON.stringify(c)})
            console.log("add ICE candidate")
            console.log(res)
        })
        console.log("end")
    }

    trickle({ candidate, target }){
        console.log("get trickle")
        console.log(candidate)
        console.log(target)

        //add trickle
        if(target == 0){
            this.candidates.push(candidate)
        }
    }

    publish


}

module.exports = Client;