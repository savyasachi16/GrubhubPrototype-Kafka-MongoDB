# Grubhub-Kafka-MongoDB

A distributed restaurant platform prototype leveraging Apache Kafka for message brokering and MongoDB for scalable storage.

## Stack

<a href="https://react.dev"><img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=000" alt="React" /></a>
<a href="https://vite.dev"><img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite" /></a>
<a href="https://kafka.apache.org"><img src="https://img.shields.io/badge/Apache_Kafka-231F20?style=flat&logo=apachekafka&logoColor=white" alt="Kafka" /></a>
<a href="https://www.mongodb.com"><img src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white" alt="MongoDB" /></a>
<a href="https://www.docker.com"><img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker" /></a>

## Architecture

- **Client**: Modern React frontend with Vite.
- **Middleware**: Kafka Producer & Express API.
- **Server**: Kafka Consumer & MongoDB Handler.
- **Infrastructure**: Containerized Kafka, Zookeeper, and MongoDB.

## Getting Started

### Prerequisites

- Node.js (v20+)
- Docker & Docker Compose

### Installation

1. Clone the repository.
2. Spin up the infrastructure:
   ```bash
   docker-compose up -d
   ```
3. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

### Running the System

- **Start Middleware**: `npm run start:middleware`
- **Start Server**: `npm run start:server`
- **Start Client**: `npm run start:client`
