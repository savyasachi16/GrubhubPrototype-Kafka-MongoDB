const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:root1234@grubhubcluster-7frcc.mongodb.net/test?retryWrites=true&w=majority";
const client = MongoClient(uri, {
    useNewUrlParser: true,
    poolSize: 4,
    useUnifiedTopology: true
});

export default client;