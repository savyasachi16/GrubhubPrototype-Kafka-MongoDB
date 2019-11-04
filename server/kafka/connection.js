import kafka from 'kafka-node';

function ConnectionProvider() {
    this.getConsumer = (topic_name) => {

        this.client = new kafka.Client("localhost:2181");
        this.kafkaConsumerConnection = new kafka.Consumer(this.client, [{
            topic: topic_name,
            partition: 0
        }]);
        this.client.on('ready', () => {
            console.log('Consumer ready!')
        })
        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = () => {

        if (!this.kafkaProducerConnection) {
            this.client = new kafka.Client("localhost:2181");
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            //this.kafkaConnection = new kafka.Producer(this.client);
            console.log('Producer ready');
        }
        return this.kafkaProducerConnection;
    };
}
const KafkaConnection = new ConnectionProvider;
export default KafkaConnection;