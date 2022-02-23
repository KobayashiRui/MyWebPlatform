//const EventEmitter = require('events');
const pb = require('./proto/edo_pb')
const edo_rpc = require('./proto/edo_grpc_pb')
const grpc = require('@grpc/grpc-js');

main()

const sleep = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );

async function main() {
    await connect()
}

async function connect() {
    const uri = "localhost:50051"
    const client = new edo_rpc.EdoServiceClient(uri,
        grpc.credentials.createInsecure());

    const token = "6d764f1c-25cf-42b5-83aa-8a9e1c5fce13"
    let metadata = new grpc.Metadata();
    metadata.add("authorization", token);


    const call = client.exController(metadata);
    //const call = client.exController();

    call.on('data', async (reply) => {
        console.log("get message")
        const command = reply.getCommand()
        console.log(command)
        const cid = reply.getCid()
        console.log(cid)

        await sleep(2000);
        const request = new pb.ExControllerResponse();
        request.setCid(cid)
        request.setResult("I got : " + command)
        call.write(request)
    })

    call.on('end', () => {
        console.log("end")
    })
}
