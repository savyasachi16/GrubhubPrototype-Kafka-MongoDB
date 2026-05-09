import KafkaRPC from './kafkarpc.js';

const rpc = new KafkaRPC();

//make request to kafka
function make_request(queue_name: string, msg_payload: any, callback: Function) {
    console.log('in make request');
    console.log(msg_payload);
    rpc.makeRequest(queue_name, msg_payload, function (err: any, response: any) {

        if (err)
            console.error(err);
        else {
            console.log("response", response);
            callback(null, response);
        }
    });
}

export { make_request };
