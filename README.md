# Chainlink-Cosmos
This project demonstrates how to connect a [Chainlink](https://chain.link/) oracle serving geospatial data to a [Cosmos](https://cosmos.network/) blockchain.

## How it works
[Starport](https://cosmos.network/starport/) is used to set up a Cosmos blockchain that has the ability to store geospatial data from the Shamba Chainlink oracle.

A WebSocket client subscribes to transaction events coming from a [Tendermint node](https://tendermint.com/core/) in the Cosmos blockchain.

This websocket client is a [Chainlink external initiator](https://docs.chain.link/docs/external-initiators-introduction/).

When it logs a transaction that indicates that a user requested some data, it triggers a [Chainlink external adapter](https://docs.chain.link/docs/external-adapters/).

This external adapter requests the Shamba oracle to provide the required data, then creates a transaction with the data on the Cosmos blockchain. 

This setup can be used by any application specific blockchain on Cosmos that needs to consume geospatial data.


## Structure
This repository contains three subrepositories:
- [linktest](https://github.com/lajosdeme/Chainlink-Cosmos/tree/main/linktest): The Cosmos blockchain written in Go.
- [external-initiator](https://github.com/lajosdeme/Chainlink-Cosmos/tree/main/external-initiator): The Chainlink external initiator written in Go.
- [link-ea](https://github.com/lajosdeme/Chainlink-Cosmos/tree/main/link-ea): The Chainlink external adapter written in JavaScript.

## Available Data
All the datasets indicated on the [Shamba Documentation] (https://docs.shamba.app) can be accessed using the above setup.

## Live Demo
To get a link and credentials to try out a live demo of this project, join the Shamba Discord server and make a request to access the demo. (https://discord.com/invite/jwMysGu7g4)

## Attribution
This project was inspired by a [Medium article](https://betterprogramming.pub/connect-a-chainlink-oracle-to-a-cosmos-blockchain-d7934d75bae5)