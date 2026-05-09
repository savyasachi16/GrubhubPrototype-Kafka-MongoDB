import crypto from 'crypto';
import Conn from './connection.js';

class KafkaRPC {
    constructor() {
        this.connection = new Conn();
        this.requests = {};
        this.response_queue = false;
        this.producer = this.connection.getProducer();
        this.consumer = this.connection.getConsumer('response_topic');
    }

    makeRequest(topic_name, content, callback) {
        var self = this;
        var correlationId = crypto.randomBytes(16).toString('hex');

        var t = setTimeout(function (itid) {
            console.log('timeout');
            delete self.requests[itid];
            callback('timeout', null);
        }, 8000, correlationId);

        var entry = {
            callback: callback,
            timeout: t
        };

        self.requests[correlationId] = entry;

        self.setupResponseQueue(self.producer, topic_name, function () {
            console.log('in setupResponseQueue');
            var payloads = [
                {
                    topic: topic_name,
                    messages: JSON.stringify({
                        correlationId: correlationId,
                        replyTo: 'response_topic',
                        data: content
                    }),
                    partition: 0
                }
            ];
            console.log('in setupResponseQueue2');
            console.log(self.producer.ready);
            self.producer.send(payloads, function (err, data) {
                console.log('in setupResponseQueue3');
                if (err)
                    console.log(err);
                console.log(data);
            });
        });
    };

    setupResponseQueue(producer, topic_name, next) {
        if (this.response_queue) return next();

        console.log('1');

        var self = this;

        var consumer = self.consumer;
        consumer.on('message', function (message) {
            console.log('msg received');
            var data = JSON.parse(message.value);
            var correlationId = data.correlationId;
            if (correlationId in self.requests) {
                var entry = self.requests[correlationId];
                clearTimeout(entry.timeout);
                delete self.requests[correlationId];
                entry.callback(null, data.data);
            }
        });
        self.response_queue = true;
        console.log('setup done');
        return next();
    };
}

export default KafkaRPC;
