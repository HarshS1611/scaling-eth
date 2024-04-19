"use client";

import { FC } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import AHackathonManager from "../artifacts/contracts/HackathonManager.sol/AHackathonManager.json";
import CHackathonManager from "../artifacts/contracts/HackathonManager.sol/CHackathonManager.json";
import { Acontract_add, Ccontract_add } from "../artifacts/config";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits, parseEther } from "ethers";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const SponsorHackModal: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
  const initialData = {
    hackId: "",
    name: "",
    threshold: "",
    price: "",
  };

  const [sponsorData, setSponsorData] = useState(initialData);
  const { id } = useParams();
  console.log(id);
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(sponsorData);
    if (!walletProvider) {
      console.log("Wallet provider is not available.");
      return;
    }
    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();

    if (chainId === 1115) {
      const resp = new Contract(Ccontract_add, CHackathonManager.abi, signer);
      const tx = await resp.sponsorHackathon(id, sponsorData.name, sponsorData.threshold, {
        value: parseEther(sponsorData.price),
      });
      await tx.wait();

    } else if (chainId === 421614) {
      const resp = new Contract(Acontract_add, AHackathonManager.abi, signer);
      const tx = await resp.sponsorHackathon(id, sponsorData.name, sponsorData.threshold, {
        value: parseEther(sponsorData.price),
      });
      await tx.wait();
    }

    // Example of using ethers.js to interact with the smart contract
    // console.log("Project created!", resp);
  };

  if (!isOpen) return null;
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-filter backdrop-blur-sm ">
      <div className="relative w-auto my-6 mx-auto">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[48rem] bg-[#1a1e27] outline-none focus:outline-none ">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font-semibold text-white">Sponsor this Hackathon</h3>
            <button className="bg-transparent border-0 text-black float-right" onClick={onClose}>
              <span className="text-black opacity-7 h-8 w-8 text-xl block bg-gray-400 py-0 rounded-full">x</span>
            </button>
          </div>
          <div className="relative p-3 flex-auto">
            <form className="bg-transparent shadow-md rounded px-8 pt-3 pb-8 w-full" onSubmit={handleSubmit}>
              <label className="block text-white text-sm font-semibold mb-1">Sponsor Name *</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full text-white
                                       block h-10 bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-5 mt-2 mb-2 mr-10 text-sm w-full focus:outline-none
                                        transition transform duration-100 ease-out"
                required
                value={sponsorData.name}
                onChange={e => setSponsorData({ ...sponsorData, name: e.target.value })}
              />
              <label className="block text-white text-sm font-semibold">Threshold *</label>
              <textarea
                value={sponsorData.threshold}
                onChange={e =>
                  setSponsorData({
                    ...sponsorData,
                    threshold: e.target.value,
                  })
                }
                id="description"
                className="
                                            shadow appearance-none border rounded w-full text-white
                                            block h-fit bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-2 mt-3 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out resize-none 
                            "
                required
              />
              <label className="block text-white text-sm font-semibold mb-1">Price(ETH)*</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full text-white
                                       block h-10 bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-5 mt-2 mb-2 mr-10 text-sm w-full focus:outline-none
                                        transition transform duration-100 ease-out"
                value={sponsorData.price}
                onChange={e => setSponsorData({ ...sponsorData, price: e.target.value })}
                required
                min={0}
                max={100}
              />
              <button
                className="text-white bg-sky-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="submit"
              // onClick={handleAddTask}
              >
                Confirm Details
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default SponsorHackModal;