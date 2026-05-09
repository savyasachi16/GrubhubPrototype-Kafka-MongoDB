import kafka from 'kafka-node';

class ConnectionProvider {
    client: any;
    kafkaConsumerConnection: any;
    kafkaProducerConnection: any;

    getConsumer(topic_name: string) {
        this.client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
        this.kafkaConsumerConnection = new kafka.Consumer(this.client, [{
            topic: topic_name,
            partition: 0
        }], { autoCommit: true });
        this.client.on('ready', function () {
            console.log('client ready!')
        })
        return this.kafkaConsumerConnection;
    };

    getProducer() {
        if (!this.kafkaProducerConnection) {
            this.client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            console.log('producer ready');
        }
        return this.kafkaProducerConnection;
    };
}

export default ConnectionProvider;
