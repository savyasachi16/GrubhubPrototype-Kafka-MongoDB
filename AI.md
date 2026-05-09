# Grubhub-Kafka-MongoDB AI Instructions

## Purpose
A complex MERN stack prototype utilizing Apache Kafka for message brokering and MongoDB for storage. Demonstrates a distributed architecture for a restaurant platform.

## Tech Stack
- **Frontend**: React (v19), Redux, Bootstrap
- **Middleware**: Node.js (ESM), Kafka Producer
- **Backend**: Node.js (ESM), Kafka Consumer, MongoDB (Mongoose 9)
- **Infrastructure**: Kafka, Zookeeper, MongoDB

## Project Layout
- `/client/`: React frontend.
- `/middleware/`: Kafka Producer & Express API.
- `/server/`: Kafka Consumer & MongoDB Handler.

## Run Instructions
- **Infrastructure**: `docker-compose up -d` (Kafka, Zookeeper, MongoDB)
- **Install**: `npm install` at root.
- **Middleware**: `npm run start:middleware`
- **Server**: `npm run start:server`
- **Client**: `npm run start:client`
