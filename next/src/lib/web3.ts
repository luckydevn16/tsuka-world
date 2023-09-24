"use client";

import { configureChains } from "wagmi";
// import { w3mProvider } from "@web3modal/ethereum";
import { publicProvider } from "wagmi/providers/public"
import { createConfig } from "wagmi";

import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

const chains = [arbitrum, mainnet, polygon];

export { Web3Modal } from "@web3modal/react";
export { WagmiConfig } from "wagmi";

if (!process.env.NEXT_PUBLIC_YOUR_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable"); 
}
export const projectId = process.env.NEXT_PUBLIC_YOUR_PROJECT_ID as string;

export const { publicClient } = configureChains(chains, [
  publicProvider(),
]);

export const wagmiClient = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  publicClient,
});

export const ethereumClient = new EthereumClient(wagmiClient, chains);
