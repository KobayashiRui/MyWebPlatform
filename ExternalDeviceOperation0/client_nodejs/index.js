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
    const uri = "coprec.site:50051"
    //const client = new edo_rpc.EdoServiceClient(uri,
    //    grpc.credentials.createInsecure());
    const client = new edo_rpc.EdoServiceClient(uri, grpc.credentials.createSsl())

    const token = "7cce611e-b382-4f92-84fc-b599d144aae5"
    let metadata = new grpc.Metadata();
    metadata.add("authorization", token);


    const call = client.exController(metadata);
    //const call = client.exController();
    //todo start 定期配信

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
