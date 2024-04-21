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
import { mainnet, polygon, arbitrumSepolia,gnosisChiado,filecoinCalibration } from 'viem/chains';
import { morph,avail,core } from "@/context/chains";
const inter = Inter({ subsets: ["latin"] });


const evmNetworks = [

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
    blockExplorerUrls: ['https://explorer-testnet.morphl2.io/'],
    chainId: 2710,
    chainName: 'Morph testnet',
    iconUrls: [],
    name: 'Morph',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH',
    },
    networkId: 2710,
    rpcUrls: ['https://rpc-testnet.morphl2.io'],
    vanityName: 'Morph testnet',
  },
  {
    blockExplorerUrls: ['https://op-avail-sepolia-explorer.alt.technology:443'],
    chainId: 202402021700,
    chainName: 'OP Avail Sepolia Testnet',
    iconUrls: [],
    name: 'Avail',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH',
    },
    networkId: 202402021700,
    rpcUrls: ['https://op-avail-sepolia.alt.technology'],
    vanityName: 'OP Avail Sepolia Testnet',
  },
  {
    blockExplorerUrls: ['https://calibration.filscan.io'],
    chainId: 314159,
    chainName: 'Core testnet',
    iconUrls: [],
    name: 'Filecoin - Calibration testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'tFIL',
      symbol: 'tFIL',
    },
    networkId: 314159,
    rpcUrls: ['https://calibration.filfox.info/rpc/v1'],
    vanityName: 'Filecoin - Calibration testnet',
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
  chains: [arbitrumSepolia,gnosisChiado,filecoinCalibration,morph,avail,core],
  multiInjectedProviderDiscovery: false,
  transports: {

    [arbitrumSepolia.id]: http(),
    [gnosisChiado.id]: http(),
    [filecoinCalibration.id]: http(),
    [morph.id]: http(),
    [avail.id]: http(),
    [core.id]: http()
  },
});
const queryClient = new QueryClient();

//@ts-ignore
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <DynamicContextProvider
        theme='dark'
        settings={{
          environmentId: 'd7fe1295-6941-440a-9270-e92cef801844',
          walletConnectors: [EthereumWalletConnectors],
          overrides: {evmNetworks}
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

