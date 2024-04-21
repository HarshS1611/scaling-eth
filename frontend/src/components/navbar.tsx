"use client";

import { TbWallet } from "react-icons/tb";
import Image from "next/image";
import { useState } from "react";
import CreateHackModal from "./CreateHackModal";
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import {
  DynamicContextProvider,
  DynamicWidget,
} from '@dynamic-labs/sdk-react-core';
import {
  createConfig,
  WagmiProvider,
  useAccount,
  useBalance
} from 'wagmi';


interface NavProps {
  balance?: string;
}

export default function Navbar(props: NavProps) {
  console.log(props);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex justify-end items-center gap-2 py-2 px-10 bg-[#282828] border-b-[0.2px]">
      {props.balance && (
        <div className="flex items-center mx-4 my-5 w-full justify-end text-white">
          <div className="bg-[#1A1A1A] dm-mono-regular flex text-xs gap-2 py-2 px-4 rounded-md items-center">
            <TbWallet className="h-6 w-6" /> Wallet Balance :
            <span className="dm-mono-medium text-[#4C76FD]">
              {props.balance} xHacks
            </span>
          </div>
          <Image src="/profile.png" alt="Profile" width={50} height={20} />
        </div>
      )}
      <div className="mr-4">
        <button
          onClick={() => {
            setModalOpen(true);
          }}
          className="flex dm-mono-regular justify-end w-max bg-[#4C76FD] px-4 py-1.5 rounded-lg"
        >
          {" "}
          Create Event
        </button>
      </div>
      <div className="flex justify-end w-max">
      <DynamicWidget />
      </div>
      {modalOpen && (
        <CreateHackModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
    </div>
  );
}
function AccountInfo() {
  const { address, isConnected, chain } = useAccount();
  const result = useBalance({
    address: address,
  })
  // console.log(result)
  return (
    <div>
      <p>
        wagmi connected: {isConnected ? 'true' : 'false'}
      </p>
      <p>wagmi address: {address}</p>
      <p>wagmi network: {chain?.id}</p>
    </div>
  );
};