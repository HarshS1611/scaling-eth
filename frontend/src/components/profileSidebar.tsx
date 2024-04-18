import { TbWallet } from "react-icons/tb";
import Image from 'next/image';
import { IoTicketSharp } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { AiFillTrophy } from "react-icons/ai";
import { SiSecurityscorecard } from "react-icons/si";


export default function ProfileSidbar({ balance }: { balance: number }) {
    return (
        <div className="  bg-[#282828]  min-h-screen w-[25%]">
            <div className="flex items-center mx-16 my-5 justify-end text-white">
                <div className="bg-black flex gap-2 p-4 rounded-md items-center">
                    <TbWallet className="h-6 w-6" /> Wallet Balance :  {balance} xHacks
                </div>
            </div>
            <div className="flex items-center mx-16 my-10 gap-10 justify-between text-white">
                <div className="text-4xl">
                    <p>Hello,</p>
                    <p>Harsh</p>
                </div>
                <div>
                    <Image src="/profile.png" alt="Profile" width={200} height={150} />
                </div>
            </div>
            <div className="mx-16 flex flex-col gap-5">
                <div className="flex flex-col gap-5 bg-[#1E1E1E] rounded-md py-5 px-5">
                    <div className="text-sm">Hackathons Stacked in : </div>
                    <p className="flex justify-end gap-4 items-center text-5xl"><IoTicketSharp className="h-10 w-10 text-[#1B52D2]" />43 </p>
                </div>
                <div className="flex flex-col xl:flex-row gap-5 justify-between">
                    <div className="flex flex-col gap-5 bg-[#1E1E1E] rounded-md py-5 px-5 w-full">
                        <div className="text-sm">Hackathons Attended : </div>
                        <p className="flex justify-end gap-4 items-center text-5xl"><FaMapLocationDot className="h-10 w-10 text-[#1ECB59]" />83 </p>
                    </div>

                    <div className="flex flex-col gap-5 bg-[#1E1E1E] rounded-md py-5 px-5 w-full">
                        <div className="text-sm">Achievements : </div>
                        <p className="flex justify-end gap-4 items-center text-5xl"><AiFillTrophy className="h-10 w-10 text-[#F6AE42]" />27 </p>
                    </div>
                </div>

                <div className="flex flex-col gap-5 bg-[#1E1E1E] rounded-md py-5 px-5">
                    <div className="text-sm" >Reputation Score : </div>
                    <p className="flex justify-end gap-4 items-center text-5xl"><SiSecurityscorecard className="h-10 w-10 text-[#B948FF]" />2034 </p>
                </div>


            </div>
        </div>
    )
}