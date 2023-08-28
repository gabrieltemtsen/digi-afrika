## Digi-Afrika

Digi-Afrika is a decentralized e-commerce platform built on the principles of an escrow framework. It enables users to buy and sell digital products on the platform. Sellers can create product ads on the platform, and anyone can make a purchase. The platform rewards users with Digi-Points for their activities, which can be redeemed for tokens once a certain threshold is met, offering tangible incentives for our vibrant community. Digi-Afrika also leverages ENS (Ethereum Name Service) for name and address resolution and allows users to register off-chain ENS names with the subdomain `example.digi-afrika.eth`. We've strategically deployed our platform on 4 blockchain networks(Avalanche Fuji, Arbitrum Goerli, Goerli and Aurora Testnet ).  

### Live Demo
https://digi-afrika.vercel.app/




### Pitch Deck
https://pitch.com/public/cd3b97f2-a853-44b3-9abf-918d6f77ca4a


## Why Buidl Digi-Afrika
Digi-Afrika was conceived to revolutionize e-commerce by combining decentralization, escrow security, and blockchain rewards. Our platform empowers users to trade digital goods with confidence, earning Digi-Points along the way. With seamless ENS integration and off-chain name registration, Digi-Afrika ensures a unique and user-friendly experience in the decentralized landscape.

## Technology Stacks
* NextJS
* Node.js & Typescript
* SpruceID
* Wagmi & Rainbowkit
* Solidity & Hardhat
* IPFS & Web3 storage
* ENS & CCIP read
* Cloudfare D1 (ENS registration DB)



## Features
* Decentralized E-commerce: Buy and sell digital products with confidence through an escrow framework.
* Digi-Points Rewards: Earn rewards for your activities on the platform, which can be redeemed for tokens.
* ENS Integration: Seamlessly resolve names and addresses using Ethereum Name Service.
* Off-chain ENS Registration: Register off-chain ENS names with the subdomain `example.digi-afrika.eth`.


## Challenges Encountered
* Fetching Products from the smart contract, looping through to retrieve the data from IPFS and displaying in the UI.
* Dependency conflicts between ethers, viem, wagmi and rainbowkit due to the packages migrations.
* Offchain-Ens registration, deploying worker on cloudfare.

## Future  Plans
* Implement a fully functional Dispute Management within an escrow framework.
* Deploy and Launch to Mainnet.


## Installation
1. Clone the repository to your local machine: 
```bash
git clone https://github.com/gabrieltemtsen/digi-afrika

```
2. Change to the project directory: 
```bash
cd digi-afrika
```
3. Install the required dependencies: 
```bash
npm install
```
## Usage
Once you have completed the installation, you can run Digi-Afrika using the following 
command: 
```bash
npm run dev
```
## Deployed contract addresses on the blockchain Networks
*  Contract Repo: https://github.com/degencodebeast/digi-afrika-contracts

```bash

GOERLI: '0x1deaE4b5B3dcA8d47E42C894C2D057661490343A'
AVALANCHE: '0xDa54728ab7f537b6a00FfBcA01441c20Bc441336'
ARBITRUM-GOERLI: '0xfc8Ed811Cf99F68cda81D99142def5E85c264fA3'

```
## ENS Resolution & Cloudfare D1
*  Worker Repo: https://github.com/gabrieltemtsen/ens-offchain-registrar/tree/main/worker

