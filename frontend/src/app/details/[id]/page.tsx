"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AHackathonManager from "../../../artifacts/contracts/HackathonManager.sol/AHackathonManager.json";
import CHackathonManager from "../../../artifacts/contracts/HackathonManager.sol/CHackathonManager.json";
import { Acontract_add, Ccontract_add } from "../../../artifacts/config";
import ReferralCard from "../components/card/page";
import FoodTimeline from "../components/foodtimline/page";
import ModalForm from "../components/form/page";
import SponsorCard from "../components/sponsorCard/page";
import VenueTimeline from "../components/venuetimeline/page";
import {
    useWeb3ModalProvider,
    useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits, parseEther } from "ethers";
import GoBackbtn from "../../../components/GoBack";
import SponsorHackModal from "../../../components/sponsorHackModal";
import Navbar from "@/components/navbar";
import { SiSecurityscorecard } from "react-icons/si";

export default function Details() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("details");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hackDetails, setHackDetails] = useState({
        name: "EthMumbai",
        description:
            "EthMumbai is a 36-hour hackathon that will test your endurance and creativity . Come showcase your skills and win exciting prizes.",
        city: "Mumbai, India",
        category: "Blockchain",
        experience: "Ninja",
        organizedBy: "ETHGlobal",
        date: "12th August 2021",
        hackers: 2200,
    } as any);

    const handleTabClick = (tabId: any) => {
        setActiveTab(tabId);
    };
    const { address, chainId, isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const [xHackToken, setXHackToken] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);


    useEffect(() => {

        const getHackDetails = async () => {
            if (!walletProvider) {
                console.log("Wallet provider is not available.");
                return;
            }
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            if (chainId === 1115) {
                console.log(chainId);
                const resp = new Contract(
                    Ccontract_add,
                    CHackathonManager.abi,
                    signer
                );
                const tx = await resp.getHackathonDetails(id);
                console.log(tx)
                setHackDetails({
                    name: tx[0],
                    organizedBy: tx[1],
                    description: tx[2],
                    date: tx[3],
                    city: tx[4],
                    experience: tx[5],
                    category: tx[6],
                    hackers: Number(tx[7]),
                }); const balance = await resp.balanceOf(address);
                console.log(formatUnits(balance, 18));
                setXHackToken(parseFloat(formatUnits(balance, 18)));
            } else if (chainId === 421614) {
                console.log(chainId);
                const resp = new Contract(
                    Acontract_add,
                    AHackathonManager.abi,
                    signer
                );
                const tx = await resp.getHackathonDetails(id);
                setHackDetails({
                    name: tx[0],
                    organizedBy: tx[1],
                    description: tx[2],
                    date: tx[3],
                    city: tx[4],
                    experience: tx[5],
                    category: tx[6],
                    hackers: Number(tx[7]),
                });
                const balance = await resp.balanceOf(address);
                console.log(formatUnits(balance, 18));
                setXHackToken(parseFloat(formatUnits(balance, 18)));
            }

        };

        getHackDetails();
    }, [chainId, address]);

    const handleAddStake = async () => {
        if (!walletProvider) {
            console.log("Wallet provider is not available.");
            return;
        }
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();

        if (chainId === 1115) {
            const resp = new Contract(Ccontract_add, CHackathonManager.abi, signer);
            const tx = await resp.joinHackathon(id, { value: parseEther("0.002") });
            await tx.wait();

        } else if (chainId === 421614) {
            const resp = new Contract(Acontract_add, AHackathonManager.abi, signer);
            const tx = await resp.joinHackathon(id, { value: parseEther("0.002") });
            await tx.wait();
        }


    };

    const [sponsors, setSponsors] = useState([]);
    useEffect(() => {
        const fetchSponsors = async () => {
            if (!walletProvider) {
                console.log("Wallet provider is not available.");
                return;
            }
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            if (chainId === 1115) {
                const resp = new Contract(Ccontract_add, CHackathonManager.abi, ethersProvider);
                const tx = await resp.getHackathonSponsors(id);
                console.log(tx);
                setSponsors(tx);

            } else if (chainId === 421614) {
                const resp = new Contract(Acontract_add, AHackathonManager.abi, ethersProvider);
                const tx = await resp.getHackathonSponsors(id);
                console.log(tx);
                setSponsors(tx);
            }

        };
        fetchSponsors();
    }, [chainId, address]);

    return (
        <>
            <Navbar balance={(xHackToken).toString()} />
            <div className="flex">
                <div className="flex flex-col gap-5 w-[30%] ml-10 xl:ml-20">
                    <GoBackbtn />
                    <div className="flex justify-center items-center bg-[#FF1E1E] rounded-lg bg-opacity-10 border-[#662020] border-[0.1px] p-4 w-full">
                        <div className="flex items-center gap-2 text-md">Registration Ends in <p className="bg-[#19191D] text-[#FF1E1E] px-4 py-2 rounded-md">03 </p> days</div>

                    </div>
                    <div className="flex flex-col gap-2 mb-5 h-max rounded-xl mt-2">
                        <div className="flex flex-col md:flex-row my-2">
                            {/* <h3 className="text-lg font-semibold md:ml-2">Name:</h3> */}

                            <p className="text-4xl font-bold md:ml-2 mt-1">{(hackDetails.name).toUpperCase()}</p>
                        </div>
                        <div className="flex flex-col md:flex-row my-2">
                            {/* <h3 className="text-lg font-semibold md:ml-2">Description:</h3> */}

                            <p className="text-md md:ml-2 mt-1">{hackDetails.description}</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2 items-center rounded-lg bg-[#4C76FD] bg-opacity-15 p-2 px-4 md:flex-row mx-2 my-2">
                                <h3 className="text-md">Hackers:</h3>

                                <p className="text-md">{hackDetails.hackers}</p>
                            </div>
                            <div className="flex flex-col gap-2 items-center rounded-lg bg-[#4C76FD] bg-opacity-15 p-2 px-4 md:flex-row mx-2 my-2">
                                <h3 className="text-md ">City:</h3>

                                <p className="text-md">{hackDetails.city}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 items-center w-max rounded-lg bg-[#4C76FD] bg-opacity-15 p-2 px-4 md:flex-row mx-2 my-2">
                            <h3 className="text-md font-semibold md:ml-2">Category:</h3>

                            <p className="text-md">{hackDetails.category}</p>
                        </div>
                        {/* <div className="flex flex-col md:flex-row my-2">
                            <h3 className="text-lg font-semibold md:ml-2">Min level:</h3>

                            <p className="text-sm md:ml-2 mt-1">{hackDetails.category}</p>
                        </div> */}
                        <button
                            onClick={handleAddStake}
                            className="block w-full px-5 py-2 mt-5 bg-white text-black hover:text-white rounded-lg shadow hover:bg-[#4C76FD]"
                        >
                            <h5 className=" text-md tracking-tight">REGISTER</h5>
                        </button>
                    </div>
                    <ReferralCard />

                </div>
                <div className="bg-[#282828] mt-20 w-[60%] mx-10 xl:mx-20 rounded-lg">
                    <div className="m-4 border-b w-max border-gray-100 dark:border-gray-600">
                        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" role="tablist">
                            <li className="me-2" role="presentation">
                                <button
                                    className={`inline-block p-4 rounded-t-lg ${activeTab === "details" ? "border-b-white border-b-4  text-white" : "hover:bg-[#3a3a3a]"
                                        }`}
                                    id="profile-tab"
                                    onClick={() => handleTabClick("details")}
                                    role="tab"
                                    aria-controls="details"
                                    aria-selected={activeTab === "details"}
                                >
                                    Hackathon Details
                                </button>
                            </li>
                            <li className="me-2" role="presentation">
                                <button
                                    className={`inline-block p-4  rounded-t-lg  ${activeTab === "sponsors" ? " border-b-white border-b-4  text-white" : "hover:bg-[#3a3a3a]"
                                        }`}
                                    id="settings-tab"
                                    onClick={() => handleTabClick("sponsors")}
                                    role="tab"
                                    aria-controls="settings"
                                    aria-selected={activeTab === "sponsors"}
                                >
                                    Sponsors
                                </button>
                            </li>

                        </ul>
                    </div>
                    <div className="m-5" id="default-tab-content">
                        <div
                            className={`p-4 rounded-lg  ${activeTab === "details" ? "text-blue-500" : "hidden"}`}
                            id="dashboard"
                            role="tabpanel"
                            aria-labelledby="dashboard-tab"
                        >
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 dark:bg-black">
                                <div onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => setShowTooltip(false)} className="relative cursor-pointer bg-white h-2.5 rounded-full " style={{ width: " 45%" }}>
                                    {showTooltip && (
                                        <div className="absolute z-10 -mt-12 px-3 py-2 text-sm font-medium text-black bg-white rounded-lg shadow-sm tooltip"
                                            style={{ left: '100%', transform: 'translateX(-50%)' }} // Center the tooltip horizontally
                                        >
                                            {hackDetails
                                                && hackDetails.hackers}
                                            <div className="tooltip-arrow"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex mb-5 justify-between w-full px-5">
                                <div className="flex justify-around gap-80 pl-20 w-[50%]">
                                    <div className="bg-white text-black py-2 px-4 rounded-md">1</div>
                                    <div className="bg-white text-black py-2 px-4 rounded-md">1</div>
                                </div>
                                <div className="bg-white text-black py-2 px-4 rounded-md">1</div>
                            </div>
                            <div className="flex flex-col gap-5 gap-x-7 text-sm text-gray-500 dark:text-gray-400">
                                <VenueTimeline hackers={hackDetails.hackers} />
                                <FoodTimeline hackers={hackDetails.hackers} />
                            </div>
                        </div>
                        <div
                            className={`relative p-4 rounded-lg ${activeTab === "sponsors" ? "" : "hidden"}`}
                            id="settings"
                            role="tabpanel"
                            aria-labelledby="settings-tab"
                        >
                            <div className="absolute right-6 -top-20 mt-2">
                                <button onClick={() => setIsModalOpen(true)} className="bg-white rounded-sm px-4 py-2 text-black">SPONSOR HACKATHON</button>
                            </div>
                            <div className="flex gap-5 w-full justify-between">
                                <div className="flex flex-col gap-5 w-full bg-[#1E1E1E] rounded-md py-5 px-5">
                                    <div className="text-sm dm-mono-regular">Total Sponsors : </div>
                                    <p className="flex justify-end gap-4 items-center font-thunder text-5xl">
                                        <SiSecurityscorecard className="h-10 w-10 text-[#B948FF]" />
                                        {sponsors.length}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-5 w-full bg-[#1E1E1E] rounded-md py-5 px-5">
                                    <div className="text-sm dm-mono-regular">Total Amount Offered : </div>
                                    <p className="flex justify-end gap-4 items-center font-thunder text-5xl">
                                        <SiSecurityscorecard className="h-10 w-10 text-[#B948FF]" />
                                        2034{" "}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-5 w-full bg-[#1E1E1E] rounded-md py-5 px-5">
                                    <div className="text-sm dm-mono-regular">Total Received : </div>
                                    <p className="flex justify-end gap-4 items-center font-thunder text-5xl">
                                        <SiSecurityscorecard className="h-10 w-10 text-[#B948FF]" />
                                        2034{" "}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 mt-10 gap-5 w-full">
                                {sponsors.map((sponsor, index) => (
                                    <SponsorCard key={index} index={index} props={sponsor} />
                                ))}
                            </div>
                        </div>

                    </div>
                    <SponsorHackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </div>
            </div>
        </>
    );
};

