"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  DynamicContextProvider,
  DynamicWidget,
} from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import {
  createConfig,
  WagmiProvider,
  useAccount,
} from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet, optimism, base } from 'viem/chains';

const inter = Inter({ subsets: ["latin"] });


const evmNetworks = [
  {
    blockExplorerUrls: ['https://etherscan.io/'],
    chainId: 1,
    chainName: 'Ethereum Mainnet',
    iconUrls: ['https://app.dynamic.xyz/assets/networks/eth.svg'],
    name: 'Ethereum',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    networkId: 1,

    rpcUrls: ['https://mainnet.infura.io/v3/'],
    vanityName: 'ETH Mainnet',
  },
  {
    blockExplorerUrls: ['https://sepolia-explorer.arbitrum.io'],
    chainId: 421614,
    chainName: 'Arbitrum Sepolia',
    iconUrls: [],
    name: 'Arbitrum',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    networkId: 421614,
    rpcUrls: ['https://arbitrum-sepolia.blockpi.network/v1/rpc/public'],
    vanityName: 'Arbitrum Sepolia',
  },
  {
    blockExplorerUrls: ['https://rpc.chiadochain.net'],
    chainId: 10200,
    chainName: 'Gnosis Chiado Testnet',
    iconUrls: [],
    name: 'Ethereum',
    nativeCurrency: {
      decimals: 18,
      name: 'xDai',
      symbol: 'XDAI',
    },
    networkId: 10200,
    rpcUrls: ['https://blockscout.chiadochain.net'],
    vanityName: 'Gnosis Chiado Testnet',
  },
  {
    blockExplorerUrls: ['https://cchain.explorer.avax-test.network'],
    chainId: 1115,
    chainName: 'Core testnet',
    iconUrls: [],
    name: 'Avalanche',
    nativeCurrency: {
      decimals: 18,
      name: 'tCore',
      symbol: 'tCORE',
    },
    networkId: 1115,
    rpcUrls: ['https://rpc.test.btcs.network'],
    vanityName: 'Core testnet',
  }

];

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http("https://mainnet.example.com"),
  },
});
const queryClient = new QueryClient();

//@ts-ignore
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <DynamicContextProvider
        settings={{
          environmentId: 'd7fe1295-6941-440a-9270-e92cef801844',
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector suppressChainMismatchError>
              <body>{children}</body>
            </DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>    </html>
  )
}

