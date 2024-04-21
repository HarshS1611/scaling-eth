"use client";

// components/Card.js
import React, { useState } from "react";
import Link from "next/link";
import AHackathonManager from "../../../../artifacts/contracts/HackathonManager.sol/AHackathonManager.json";
import CHackathonManager from "../../../../artifacts/contracts/HackathonManager.sol/CHackathonManager.json";
import { Acontract_add, Ccontract_add } from "../../../../artifacts/config";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, parseEther } from "ethers";
import { useReadContract, useAccount, useSignMessage } from 'wagmi'
import { chainIdToContractMap } from "@/context/allchains";
import { useWriteContract } from 'wagmi'

const Card = ({ title, map, tag1, tag2, description, voters, onClick }: any) => {
  const [voteCount, setVoteCount] = useState(0);
  const handleVoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Parse the input value as a number and update the voteCount state
    const newVoteCount = parseInt(event.target.value, 10);
    setVoteCount(newVoteCount);
  };
  const { address, isConnected, chainId } = useAccount();
  const { signMessage } = useSignMessage()
  const [xHackToken, setXHackToken] = useState(0)
  console.log(isConnected)
  const contractDetails = chainIdToContractMap[chainId];


  const balance = useReadContract({
    abi: contractDetails?.abi,
    address: contractDetails?.address,
    functionName: "balanceOf",
    args: [address],

  });
  const approval = useReadContract({
    abi: contractDetails?.abi,
    address: contractDetails?.address,
    functionName: "approve",
    args: [contractDetails?.address,balance],

  });
  const resp = useReadContract({
    abi: contractDetails?.abi,
    address: contractDetails?.address,
    functionName: "transferTokensToContract",
    args: [parseEther(voteCount.toString())],

  });
  console.log(resp)
  onClick();
  const vote = async () => {
    onClick();
  }
  // const vote = async () => {


  //   if (chainId === 1115) {
  //     console.log(chainId);
  //     const resp = new Contract(
  //       Ccontract_add,
  //       CHackathonManager.abi,
  //       signer
  //     );
  //     const balance = await resp.balanceOf(address);
  //     const approval = await resp.approve(Ccontract_add, balance);
  //     const tx = await resp.transferTokensToContract(parseEther(voteCount.toString()));
  //     await tx.wait();
  //     console.log(tx);

  //   } else if (chainId === 421614) {
  //     console.log(chainId);
  //     const resp = new Contract(
  //       Acontract_add,
  //       AHackathonManager.abi,
  //       signer
  //     );
  //     const balance = await resp.balanceOf(address);

  //     const approval = await resp.approve(Acontract_add, balance);
  //     const tx = await resp.transferTokensToContract(parseEther(voteCount.toString()));
  //     await tx.wait();
  //     console.log(tx);
  //   }



  //   onClick();
  // };

  return (
    <div className="relative dm-mono-regular py-4 bg-[#1A1A1A] h-full w-[40%] rounded-[20px] shadow-xl">
      <div className="flex flex-col w-[600px]">
        <div className="flex justify-start gap-2 mx-5 mt-5">
          <input className="bg-[#19191D] cursor-pointer border-[#A2A2A2]" type="checkbox" /> Select Venue
        </div>
        <div className="flex items-center justify-start mx-5 mt-1.5 ">
          <div className="flex flex-col">
            <h4 className={`text-lg font-medium mt-2 text-white mb-2`}>{title}</h4>

          </div>
        </div>
        <hr className="border-[#2B2F3D] mx-5" />
        <p className="text-[#B2B4C6] text-md px-5 w-[80%]">{description}</p>
        <div className="flex items-center mx-4 my-4 gap-x-2">
          <span className={`text-md font-medium text-white bg-[#4C76FD] bg-opacity-25 px-3 py-1 rounded-lg`}>{tag1}</span>
          <span className={`text-md font-medium text-white bg-[#4C76FD] bg-opacity-25 px-3 py-1 rounded-lg`}>
            <div className="flex gap-x-2 items-center">
              {/* <Image src="/assets/demo-icon.svg" width={15} height={15} alt="demo" /> */}
              <span>{tag2}</span>
            </div>
          </span>
        </div>
     
      </div>
      <div className="flex justify-center h-96 items-end w-full">
        <iframe
          className="px-4 py-10 rounded-lg"
          src={map}
          width="500"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Card;
