# Grubhub Prototype with Kafka and MongoDB

This a prototype of Grubhub.com built using MongoDB, Kafka Messaging Queues, React.js, Express.js and Node.js.
The prototype is built as a lab requirement for Enterprise Distributed Systems (CMPE - 273) class at San Jose State University, under professor Simon Shim.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need Node.js installed on your machine.

To install Node.js on Mac:
```
brew install nodejs
```

To install Node.js on Linux:
```
brew install nodejs
```

### Installing

Clone the contents of the Git repository to your local:
```
git clone https://github.com/savyasachi16/Grubhub-Prototype.git
```

Go into the client directory and run the following command:
```
npm install
```
Go into the middlerware directory and run the following command:
```
npm install
```
Go into the server directory and run the following command:
```
npm install
```

First, initialize Zookeper and Kafka by going into the Kafka directory and running the following commands:
```
bin/zookeeper-server-start.sh config/zookeeper.properties
```
```
bin/kafka-server-start.sh config/server.properties
```

To run the client, go into the client directory and run the following command:
```
npm start
```
To run the middleware, go into the middleware directory and run the following command:
```
npm start
```
To run the server, go into the server directory and run the following command:
```
npm start
```

To use the application, visit the following url from your browser:
http://localhost:3001/

## License

This project is licensed under the MIT License.
