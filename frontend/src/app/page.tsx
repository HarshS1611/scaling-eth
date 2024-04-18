"use client";

/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Image from "next/image";
import AHackathonManager from "../artifacts/contracts/HackathonManager.sol/AHackathonManager.json";
import CHackathonManager from "../artifacts/contracts/HackathonManager.sol/CHackathonManager.json";
import { Acontract_add, Ccontract_add } from "../artifacts/config";
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, formatUnits } from 'ethers'
import HackathonCard from "@/components/HackathonCard";
import ProfileSidbar from "@/components/profileSidebar";

export default function Home() {
  const [hackathons, setHackathons] = useState<{ name: string; type: string; hackers: number; organizer: string; status?: string }[]>([]);
  const [xHackToken, setXHackToken] = useState(0);
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()
  useEffect(() => {

    const fetchHackathons = async () => {
      if (!walletProvider) {
        console.log('Wallet provider is not available.');
        return;
      }
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      if (chainId === 1115) {
        console.log(chainId)
        const resp = new Contract(Ccontract_add, CHackathonManager.abi, ethersProvider);
        const tx = await resp.getAllHackathons();
        setHackathons(tx);
        const balance = await resp.balanceOf(address);
        console.log(formatUnits(balance, 18));
        setXHackToken(parseFloat(formatUnits(balance, 18)));
      } else if (chainId === 421614) {
        console.log(chainId)
        const resp = new Contract(Acontract_add, AHackathonManager.abi, ethersProvider);
        const tx = await resp.getAllHackathons();
        setHackathons(tx);
        const balance = await resp.balanceOf(address);
        console.log(formatUnits(balance, 18));
        setXHackToken(parseFloat(formatUnits(balance, 18)));
      }



    };

    fetchHackathons();
  }, [walletProvider, chainId]);


  // useEffect(() => {
  //   // Mock hackathon data with organizer
  //   const mockHackathons = [
  //     { name: "Hackathon 1", type: "Web Development", hackers: 50, organizer: "John Doe" },
  //     { name: "Hackathon 2", type: "Data Science", hackers: 30, organizer: "Jane Smith" },
  //     { name: "Hackathon 3", type: "Blockchain", hackers: 40, organizer: "Alice Johnson" },
  //     { name: "Hackathon 4", status: "Active", type: "Machine Learning", hackers: 60, organizer: "Bob Brown" },
  //     { name: "Hackathon 5", type: "Cybersecurity", hackers: 25, organizer: "Charlie Davis" },
  //   ];

  //   setHackathons(mockHackathons);
  // }, []);


  return (
    <main className="">
      <Navbar />
      <div className="flex">
        <div className="flex w-[75%] flex-col">
          <h1 className="text-white mx-20 text-4xl font-thunder font-bold mt-5 mb-0.5">ALL HACKATHONS</h1>
          <div className="mx-20 my-5 flex gap-6">
            <button className={`px-6 py-2 rounded-sm text-lg my-5 bg-white text-black`}>All</button>
            <button className={`px-6 py-2 rounded-sm text-lg my-5 bg-neutral-700 text-[#C3C3C3]`}>
              Registration
            </button>
            <button className={`px-6 py-2 rounded-sm text-lg my-5  bg-neutral-700 text-[#C3C3C3]`}>Voting</button>
            <button className={`px-6 py-2 rounded-sm text-lg my-5 bg-neutral-700 text-[#C3C3C3]`}>
              Results
            </button>
          </div>
          <div className="flex flex-wrap justify-start mx-20 w-full gap-x-5 items-center">


            <div className="grid grid-cols-1 lg:grid-cols-2 xl:w-[90%] xl:grid-cols-3  gap-10 my-2">
              {hackathons.map((hackathon, index) => (
                <HackathonCard index={index} props={hackathon} />
              ))}
              {hackathons.map((hackathon, index) => (
                <HackathonCard index={index} props={hackathon} />
              ))}
            </div>
          </div>
        </div>
        <ProfileSidbar balance={xHackToken} />

      </div>
    </main>
  );
}
