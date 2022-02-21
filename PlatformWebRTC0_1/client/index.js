const { v4: uuidv4 } = require('uuid');

const IonSFUGRPCSignal = require('./signal');
const Client = require('./client');


const signal = new IonSFUGRPCSignal("localhost:50051", {})

const client = new Client(signal);


main()

async function main() {

    console.log("join!")
    const sid = "ion";
    const uid = uuidv4();

    await client.join(sid, uid)
}