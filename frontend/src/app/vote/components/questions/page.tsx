// components/Question.js
import React, { useState } from "react";
import Card from "../card/page";
import AHackathonManager from "../../../../artifacts/contracts/HackathonManager.sol/AHackathonManager.json";
import CHackathonManager from "../../../../artifacts/contracts/HackathonManager.sol/CHackathonManager.json";
import { Acontract_add, Ccontract_add } from "../../../../artifacts/config";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, parseEther } from "ethers";
import { FaStar } from "react-icons/fa6";
interface QuestionProps {
  selectedVenueOption: string[];
  question: string;
  options: string[];
  onOptionSelect: (option: string) => void;
}

const Question: React.FC<QuestionProps> = ({ selectedVenueOption, question, options, onOptionSelect }) => {

  const [voteCount, setVoteCount] = useState(0);
  const [glowClasses1, setGlowClasses1] = useState(false);
  const [glowClasses2, setGlowClasses2] = useState(false);

  const [glowClasses3, setGlowClasses3] = useState(false);
  const handleVoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Parse the input value as a number and update the voteCount state
    const newVoteCount = parseInt(event.target.value, 10);
    setVoteCount(newVoteCount);
  };
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const vote = async () => {
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
      const balance = await resp.balanceOf(address);
      const approval = await resp.approve(Ccontract_add, balance);
      const tx = await resp.transferTokensToContract(parseEther(voteCount.toString()));
      await tx.wait();
      onOptionSelect(options[1])
      console.log(tx);

    } else if (chainId === 421614) {
      console.log(chainId);
      const resp = new Contract(
        Acontract_add,
        AHackathonManager.abi,
        signer
      );
      const balance = await resp.balanceOf(address);

      const approval = await resp.approve(Acontract_add, balance);
      const tx = await resp.transferTokensToContract(parseEther(voteCount.toString()));
      await tx.wait();
      onOptionSelect(options[1])
      console.log(tx);
    }
  };
  if (!options || options.length < 6 || !question) {
    // Handle the case where options is undefined or not long enough
    // For example, you could return a loading state, an error message, or a default value
    return <div>Loading...</div>;
  }
  return (

    <div className="flex  justify-center w-full">
      <div className="question dm-mono-regular flex flex-col h-screen justify-center w-full items-center">

        <ol className="flex justify-around mt-5 items-center dashed border-white ">

          <li className="relative mb-6 sm:mb-0">

            <div className="flex gap-2 items-center ">
              <svg width="100" height="106" viewBox="0 0 50 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 1.1547C24.2376 0.440169 25.7624 0.440169 27 1.1547L47.2487 12.8453C48.4863 13.5598 49.2487 14.8803 49.2487 16.3094V39.6906C49.2487 41.1197 48.4863 42.4402 47.2487 43.1547L27 54.8453C25.7624 55.5598 24.2376 55.5598 23 54.8453L2.75129 43.1547C1.51368 42.4402 0.751289 41.1197 0.751289 39.6906V16.3094C0.751289 14.8803 1.51369 13.5598 2.75129 12.8453L23 1.1547Z" fill="#335FC6" />
                <path d="M30.9008 31.5743C32.0293 30.382 32.7837 28.8851 33.0707 27.2687C33.3576 25.6523 33.1647 23.9872 32.5157 22.4792C31.8666 20.9713 30.7899 19.6866 29.4187 18.7839C28.0474 17.8813 26.4417 17.4002 24.8 17.4002C23.1583 17.4002 21.5526 17.8813 20.1813 18.7839C18.8101 19.6866 17.7334 20.9713 17.0844 22.4792C16.4353 23.9872 16.2424 25.6523 16.5294 27.2687C16.8164 28.8851 17.5707 30.382 18.6992 31.5743C19.3468 30.5409 20.2464 29.6891 21.3136 29.0988C22.3808 28.5086 23.5805 28.1992 24.8 28.1999C26.0195 28.1992 27.2192 28.5086 28.2864 29.0988C29.3536 29.6891 30.2532 30.5409 30.9008 31.5743ZM24.8 41.0735L17.1632 33.4367C15.6528 31.9263 14.6242 30.0019 14.2075 27.9069C13.7908 25.8119 14.0047 23.6404 14.8221 21.667C15.6395 19.6936 17.0238 18.0068 18.7999 16.8201C20.5759 15.6334 22.664 15 24.8 15C26.936 15 29.0241 15.6334 30.8001 16.8201C32.5762 18.0068 33.9605 19.6936 34.7779 21.667C35.5953 23.6404 35.8092 25.8119 35.3925 27.9069C34.9758 30.0019 33.9472 31.9263 32.4368 33.4367L24.8 41.0735ZM24.8 26.9999C23.8452 26.9999 22.9296 26.6206 22.2544 25.9455C21.5793 25.2704 21.2 24.3547 21.2 23.3999C21.2 22.4451 21.5793 21.5295 22.2544 20.8543C22.9296 20.1792 23.8452 19.7999 24.8 19.7999C25.7548 19.7999 26.6705 20.1792 27.3456 20.8543C28.0207 21.5295 28.4 22.4451 28.4 23.3999C28.4 24.3547 28.0207 25.2704 27.3456 25.9455C26.6705 26.6206 25.7548 26.9999 24.8 26.9999Z" fill="white" />
              </svg>



              <div className="hidden sm:flex w-full h-0.5 border-b-2 border-dashed"></div>
            </div>

          </li>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center ">

              <svg width="70" height="56" viewBox="0 0 50 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 1.1547C24.2376 0.440169 25.7624 0.440169 27 1.1547L47.2487 12.8453C48.4863 13.5598 49.2487 14.8803 49.2487 16.3094V39.6906C49.2487 41.1197 48.4863 42.4402 47.2487 43.1547L27 54.8453C25.7624 55.5598 24.2376 55.5598 23 54.8453L2.75129 43.1547C1.51368 42.4402 0.751289 41.1197 0.751289 39.6906V16.3094C0.751289 14.8803 1.51369 13.5598 2.75129 12.8453L23 1.1547Z" fill="#D9D9D9" />
                <path d="M33.8407 18.4876C33.7297 18.4876 33.6196 18.4676 33.5156 18.4286C27.9518 16.3499 21.8251 16.3469 16.2592 18.4202C16.0269 18.5064 15.7699 18.4968 15.5447 18.3935C15.3195 18.2902 15.1446 18.1017 15.0584 17.8695C14.9722 17.6372 14.9818 17.3802 15.085 17.155C15.1883 16.9298 15.3768 16.7548 15.6091 16.6686C21.5946 14.4403 28.1827 14.4439 34.1657 16.6787C34.3717 16.7544 34.5444 16.9002 34.6534 17.0906C34.7625 17.2809 34.8011 17.5036 34.7623 17.7195C34.7235 17.9355 34.6098 18.1308 34.4413 18.2713C34.2727 18.4118 34.0601 18.4883 33.8407 18.4876ZM33.0895 20.0404C33.0895 20.0404 32.5657 19.8383 31.9156 19.6311C27.4256 18.2058 22.6088 18.1765 18.1017 19.5469C17.3775 19.7693 16.687 20.0354 16.687 20.0354C16.5897 20.0726 16.5008 20.1291 16.4256 20.2013C16.3504 20.2735 16.2905 20.3601 16.2494 20.4558C16.2082 20.5516 16.1867 20.6547 16.1861 20.7589C16.1855 20.8632 16.2058 20.9665 16.2457 21.0627L24.5708 41.189C24.7392 41.5949 25.0137 41.5949 25.1822 41.189L33.5291 21.0711C33.569 20.9751 33.5892 20.872 33.5887 20.768C33.5882 20.664 33.5669 20.5611 33.5261 20.4654C33.4853 20.3697 33.4259 20.2831 33.3512 20.2107C33.2765 20.1383 33.1881 20.0816 33.0912 20.0438L33.0895 20.0404ZM18.7401 22.9103C18.7401 22.4356 18.8808 21.9716 19.1445 21.5769C19.4082 21.1823 19.7831 20.8746 20.2216 20.693C20.6602 20.5113 21.1427 20.4638 21.6083 20.5564C22.0738 20.649 22.5015 20.8776 22.8371 21.2132C23.1728 21.5489 23.4013 21.9765 23.4939 22.4421C23.5865 22.9076 23.539 23.3902 23.3574 23.8287C23.1757 24.2673 22.8681 24.6421 22.4734 24.9058C22.0788 25.1695 21.6147 25.3103 21.1401 25.3103C20.5035 25.3103 19.8931 25.0574 19.443 24.6074C18.9929 24.1573 18.7401 23.5468 18.7401 22.9103ZM24.9076 34.6509C24.433 34.6509 23.9689 34.5102 23.5743 34.2465C23.1796 33.9827 22.872 33.6079 22.6903 33.1694C22.5087 32.7308 22.4611 32.2483 22.5538 31.7827C22.6464 31.3172 22.8749 30.8895 23.2106 30.5539C23.5462 30.2182 23.9739 29.9897 24.4394 29.897C24.905 29.8044 25.3875 29.852 25.8261 30.0336C26.2646 30.2153 26.6394 30.5229 26.9032 30.9176C27.1669 31.3122 27.3076 31.7763 27.3076 32.2509C27.3076 32.8875 27.0548 33.4979 26.6047 33.948C26.1546 34.3981 25.5442 34.6509 24.9076 34.6509ZM27.7001 27.9899C27.2254 27.9899 26.7614 27.8491 26.3667 27.5854C25.972 27.3217 25.6644 26.9469 25.4827 26.5083C25.3011 26.0698 25.2536 25.5872 25.3462 25.1217C25.4388 24.6561 25.6674 24.2285 26.003 23.8928C26.3386 23.5572 26.7663 23.3286 27.2318 23.236C27.6974 23.1434 28.18 23.1909 28.6185 23.3726C29.057 23.5542 29.4319 23.8618 29.6956 24.2565C29.9593 24.6512 30.1001 25.1152 30.1001 25.5899C30.1001 26.2264 29.8472 26.8369 29.3971 27.2869C28.947 27.737 28.3366 27.9899 27.7001 27.9899Z" fill="black" />
              </svg>



              {/* <div className="hidden sm:flex w-full h-0.5 border-b-2 border-dashed"></div> */}
            </div>

          </li>

          <li className="relative mb-6 sm:mb-0">
            <div className="flex gap-2 items-center">
              <div className="hidden sm:flex w-full h-0.5 border-b-2 border-dashed"></div>

              <svg width="100" height="106" viewBox="0 0 50 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 1.1547C24.2376 0.440169 25.7624 0.440169 27 1.1547L47.2487 12.8453C48.4863 13.5598 49.2487 14.8803 49.2487 16.3094V39.6906C49.2487 41.1197 48.4863 42.4402 47.2487 43.1547L27 54.8453C25.7624 55.5598 24.2376 55.5598 23 54.8453L2.75129 43.1547C1.51368 42.4402 0.751289 41.1197 0.751289 39.6906V16.3094C0.751289 14.8803 1.51369 13.5598 2.75129 12.8453L23 1.1547Z" fill="#D9D9D9" />
                <path d="M33.0021 21.9223L24.5 17L15.9979 21.9223L24.5 26.8445L33.0021 21.9223ZM15 23.6555V33.5L23.5 38.4211V28.5765L15 23.6555ZM25.5 38.4211L34 33.5V23.6555L25.5 28.5765V38.4211Z" fill="#0A0D14" />
              </svg>

            </div>

          </li>
        </ol>


        <h1 className="text-2xl text-[#E3A300] mt-5 font-bold mb-2">{question}</h1>
        <div className="flex gap-6 mt-5 justify-center items-center h-max">
          <Card
            title={options[0]}
            map={options[2]}
            tag1={options[4]}
            tag2={options[6]}
            description={options[8]}
            voters={options[10]}
            onClick={() => {
              onOptionSelect(options[0]);
              console.log(options[0])
            }}
          />
          {/* <span className="text-2xl text-[#E3A300] font-bold">OR</span> */}
          <Card
            title={options[1]}
            map={options[3]}
            tag1={options[5]}
            tag2={options[7]}
            description={options[9]}
            voters={options[11]}
            onClick={() => {
              onOptionSelect(options[1]);
              console.log(options[1])
            }}
          />
        </div>
        <div className="flex flex-col gap-2 mt-5 justify-center items-center h-max">
          <div className="flex justify-start items-center w-full gap-2">
            Amount:

            <svg width="168" height="24" viewBox="0 0 168 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="168" height="24" rx="4" fill="#4C76FD" fill-opacity="0.18" />
              <path d="M8.7 17V7.2H9.96L12.2 11.862L14.44 7.2H15.7V17H14.552V9.468L12.648 13.43H11.752L9.848 9.482V17H8.7ZM19.7265 17.168C19.1759 17.168 18.7185 17.07 18.3545 16.874C17.9905 16.678 17.7199 16.4213 17.5425 16.104C17.3652 15.7773 17.2765 15.4227 17.2765 15.04C17.2765 14.3307 17.5332 13.794 18.0465 13.43C18.5692 13.0567 19.2645 12.87 20.1325 12.87H22.0365V12.73C22.0365 11.5167 21.4812 10.91 20.3705 10.91C19.9225 10.91 19.5445 11.008 19.2365 11.204C18.9379 11.4 18.7465 11.708 18.6625 12.128H17.4585C17.5052 11.6613 17.6592 11.26 17.9205 10.924C18.1912 10.588 18.5365 10.3313 18.9565 10.154C19.3765 9.97667 19.8479 9.888 20.3705 9.888C21.3599 9.888 22.0785 10.1493 22.5265 10.672C22.9839 11.1853 23.2125 11.8713 23.2125 12.73V17H22.2045L22.1065 15.922H22.0085C21.8032 16.258 21.5279 16.552 21.1825 16.804C20.8465 17.0467 20.3612 17.168 19.7265 17.168ZM19.9365 16.132C20.3845 16.132 20.7625 16.0247 21.0705 15.81C21.3879 15.5953 21.6259 15.3107 21.7845 14.956C21.9525 14.6013 22.0365 14.214 22.0365 13.794H20.2305C19.5959 13.794 19.1479 13.9013 18.8865 14.116C18.6345 14.3307 18.5085 14.6153 18.5085 14.97C18.5085 15.334 18.6299 15.6187 18.8725 15.824C19.1152 16.0293 19.4699 16.132 19.9365 16.132ZM25.2511 17L27.6171 13.528L25.1951 10.056H26.4971L28.4291 12.856L30.3611 10.056H31.6631L29.2411 13.528L31.6071 17H30.3051L28.4291 14.186L26.5391 17H25.2511ZM44.7561 17.168C44.0655 17.168 43.4635 17.0373 42.9501 16.776C42.4461 16.5147 42.0541 16.1507 41.7741 15.684C41.5035 15.2173 41.3635 14.6713 41.3541 14.046H42.5861C42.5955 14.606 42.7821 15.0913 43.1461 15.502C43.5195 15.9033 44.0561 16.104 44.7561 16.104C45.4001 16.104 45.8948 15.95 46.2401 15.642C46.5948 15.3247 46.7721 14.9467 46.7721 14.508C46.7721 14.144 46.6881 13.8407 46.5201 13.598C46.3521 13.346 46.0768 13.1267 45.6941 12.94C45.3208 12.744 44.8168 12.5433 44.1821 12.338C43.2861 12.0673 42.6328 11.6987 42.2221 11.232C41.8115 10.7653 41.6061 10.1867 41.6061 9.496C41.6061 9.02933 41.7275 8.60933 41.9701 8.236C42.2128 7.86267 42.5628 7.56867 43.0201 7.354C43.4775 7.13933 44.0328 7.032 44.6861 7.032C45.3021 7.032 45.8388 7.14867 46.2961 7.382C46.7628 7.606 47.1221 7.92333 47.3741 8.334C47.6355 8.74467 47.7661 9.216 47.7661 9.748H46.5341C46.5341 9.48667 46.4641 9.23 46.3241 8.978C46.1841 8.726 45.9741 8.516 45.6941 8.348C45.4141 8.18 45.0595 8.096 44.6301 8.096C44.1168 8.096 43.6875 8.222 43.3421 8.474C42.9968 8.71667 42.8241 9.05267 42.8241 9.482C42.8241 9.80867 42.8988 10.084 43.0481 10.308C43.2068 10.532 43.4635 10.7373 43.8181 10.924C44.1728 11.1013 44.6535 11.2927 45.2601 11.498C45.8295 11.6847 46.3148 11.904 46.7161 12.156C47.1268 12.3987 47.4395 12.702 47.6541 13.066C47.8781 13.43 47.9901 13.8827 47.9901 14.424C47.9901 14.956 47.8548 15.4273 47.5841 15.838C47.3135 16.2487 46.9355 16.5753 46.4501 16.818C45.9648 17.0513 45.4001 17.168 44.7561 17.168ZM53.5007 17C52.866 17 52.3667 16.846 52.0027 16.538C51.6387 16.23 51.4567 15.6747 51.4567 14.872V11.064H49.6927V10.056H50.7427C51.2187 10.056 51.494 9.82267 51.5687 9.356L51.7647 8.278H52.6327V10.056H55.4047V11.064H52.6327V14.872C52.6327 15.264 52.7213 15.5393 52.8987 15.698C53.0853 15.8567 53.4027 15.936 53.8507 15.936H55.4047V17H53.5007ZM60.2992 17.168C59.7485 17.168 59.2912 17.07 58.9272 16.874C58.5632 16.678 58.2925 16.4213 58.1152 16.104C57.9379 15.7773 57.8492 15.4227 57.8492 15.04C57.8492 14.3307 58.1059 13.794 58.6192 13.43C59.1419 13.0567 59.8372 12.87 60.7052 12.87H62.6092V12.73C62.6092 11.5167 62.0539 10.91 60.9432 10.91C60.4952 10.91 60.1172 11.008 59.8092 11.204C59.5105 11.4 59.3192 11.708 59.2352 12.128H58.0312C58.0779 11.6613 58.2319 11.26 58.4932 10.924C58.7639 10.588 59.1092 10.3313 59.5292 10.154C59.9492 9.97667 60.4205 9.888 60.9432 9.888C61.9325 9.888 62.6512 10.1493 63.0992 10.672C63.5565 11.1853 63.7852 11.8713 63.7852 12.73V17H62.7772L62.6792 15.922H62.5812C62.3759 16.258 62.1005 16.552 61.7552 16.804C61.4192 17.0467 60.9339 17.168 60.2992 17.168ZM60.5092 16.132C60.9572 16.132 61.3352 16.0247 61.6432 15.81C61.9605 15.5953 62.1985 15.3107 62.3572 14.956C62.5252 14.6013 62.6092 14.214 62.6092 13.794H60.8032C60.1685 13.794 59.7205 13.9013 59.4592 14.116C59.2072 14.3307 59.0812 14.6153 59.0812 14.97C59.0812 15.334 59.2025 15.6187 59.4452 15.824C59.6879 16.0293 60.0425 16.132 60.5092 16.132ZM66.3557 17V6.92H67.5317V12.996L70.4297 10.056H71.9277L68.8337 13.15V13.234L72.3057 17H70.8497L67.5317 13.388V17H66.3557ZM77.1863 17.168C76.5329 17.168 75.9543 17.0187 75.4503 16.72C74.9556 16.412 74.5636 15.9873 74.2743 15.446C73.9849 14.8953 73.8403 14.256 73.8403 13.528C73.8403 12.8 73.9803 12.1653 74.2603 11.624C74.5496 11.0733 74.9463 10.6487 75.4503 10.35C75.9543 10.042 76.5423 9.888 77.2143 9.888C77.8863 9.888 78.4603 10.042 78.9363 10.35C79.4123 10.6487 79.7763 11.0453 80.0283 11.54C80.2803 12.0347 80.4063 12.5667 80.4063 13.136C80.4063 13.2387 80.4016 13.3413 80.3923 13.444C80.3923 13.5467 80.3923 13.6633 80.3923 13.794H75.0023C75.0303 14.3073 75.1469 14.7367 75.3523 15.082C75.5669 15.418 75.8329 15.67 76.1503 15.838C76.4769 16.006 76.8223 16.09 77.1863 16.09C77.6996 16.09 78.1009 15.9827 78.3903 15.768C78.6796 15.5533 78.8989 15.2547 79.0483 14.872H80.2103C80.0516 15.516 79.7203 16.062 79.2163 16.51C78.7123 16.9487 78.0356 17.168 77.1863 17.168ZM77.1863 10.938C76.6449 10.938 76.1689 11.1013 75.7583 11.428C75.3569 11.7547 75.1096 12.212 75.0163 12.8H79.2443C79.2069 12.2213 78.9969 11.7687 78.6143 11.442C78.2409 11.106 77.7649 10.938 77.1863 10.938ZM85.2308 17.028C84.9415 17.028 84.6941 16.93 84.4888 16.734C84.2835 16.538 84.1808 16.2953 84.1808 16.006C84.1808 15.726 84.2835 15.488 84.4888 15.292C84.6941 15.096 84.9415 14.998 85.2308 14.998C85.5201 14.998 85.7675 15.096 85.9728 15.292C86.1781 15.488 86.2808 15.726 86.2808 16.006C86.2808 16.2953 86.1781 16.538 85.9728 16.734C85.7675 16.93 85.5201 17.028 85.2308 17.028ZM85.2308 11.498C84.9415 11.498 84.6941 11.4 84.4888 11.204C84.2835 11.008 84.1808 10.7653 84.1808 10.476C84.1808 10.196 84.2835 9.958 84.4888 9.762C84.6941 9.566 84.9415 9.468 85.2308 9.468C85.5201 9.468 85.7675 9.566 85.9728 9.762C86.1781 9.958 86.2808 10.196 86.2808 10.476C86.2808 10.7653 86.1781 11.008 85.9728 11.204C85.7675 11.4 85.5201 11.498 85.2308 11.498Z" fill="white" />
              <path d="M102.186 17.168C101.505 17.168 100.912 17.042 100.408 16.79C99.904 16.538 99.5073 16.1927 99.218 15.754C98.938 15.3153 98.7747 14.8207 98.728 14.27H100.24C100.333 14.7273 100.548 15.096 100.884 15.376C101.229 15.656 101.668 15.796 102.2 15.796C102.825 15.796 103.32 15.6 103.684 15.208C104.048 14.8067 104.23 14.2933 104.23 13.668C104.23 13.0053 104.043 12.492 103.67 12.128C103.297 11.764 102.821 11.582 102.242 11.582C101.775 11.582 101.379 11.6893 101.052 11.904C100.725 12.1187 100.469 12.3893 100.282 12.716H98.854L99.694 7.2H105.028V8.572H100.842L100.366 11.078H100.464C100.66 10.854 100.921 10.6673 101.248 10.518C101.584 10.3687 101.981 10.294 102.438 10.294C103.11 10.294 103.684 10.4387 104.16 10.728C104.645 11.0173 105.019 11.4187 105.28 11.932C105.541 12.436 105.672 13.01 105.672 13.654C105.672 14.3073 105.527 14.9 105.238 15.432C104.958 15.964 104.557 16.3887 104.034 16.706C103.511 17.014 102.895 17.168 102.186 17.168ZM115.069 17L117.449 13.528L114.985 10.056H116.637L118.429 12.646L120.221 10.056H121.873L119.409 13.528L121.789 17H120.137L118.429 14.41L116.707 17H115.069ZM122.918 17V7.2H124.402V11.26H128.686V7.2H130.17V17H128.686V12.618H124.402V17H122.918ZM134.028 17.168C133.477 17.168 133.015 17.0747 132.642 16.888C132.269 16.692 131.989 16.4353 131.802 16.118C131.615 15.7913 131.522 15.4367 131.522 15.054C131.522 14.3727 131.769 13.8407 132.264 13.458C132.768 13.0753 133.477 12.884 134.392 12.884H136.184V12.73C136.184 11.6847 135.699 11.162 134.728 11.162C134.327 11.162 133.986 11.2507 133.706 11.428C133.435 11.596 133.253 11.8713 133.16 12.254H131.676C131.751 11.526 132.063 10.952 132.614 10.532C133.174 10.1027 133.879 9.888 134.728 9.888C135.755 9.888 136.501 10.14 136.968 10.644C137.435 11.148 137.668 11.8433 137.668 12.73V17H136.408L136.282 15.978H136.184C135.979 16.3047 135.722 16.5847 135.414 16.818C135.106 17.0513 134.644 17.168 134.028 17.168ZM134.308 15.922C134.915 15.922 135.367 15.74 135.666 15.376C135.974 15.0027 136.142 14.5313 136.17 13.962H134.546C134.014 13.962 133.636 14.0507 133.412 14.228C133.197 14.396 133.09 14.634 133.09 14.942C133.09 15.25 133.197 15.4927 133.412 15.67C133.636 15.838 133.935 15.922 134.308 15.922ZM142.871 17.168C142.227 17.168 141.648 17.0187 141.135 16.72C140.631 16.4213 140.234 16.0013 139.945 15.46C139.655 14.9093 139.511 14.2653 139.511 13.528C139.511 12.7907 139.655 12.1513 139.945 11.61C140.243 11.0687 140.645 10.6487 141.149 10.35C141.653 10.042 142.227 9.888 142.871 9.888C143.757 9.888 144.471 10.112 145.013 10.56C145.563 10.9987 145.913 11.6053 146.063 12.38H144.509C144.415 12.044 144.224 11.778 143.935 11.582C143.655 11.386 143.295 11.288 142.857 11.288C142.539 11.288 142.236 11.372 141.947 11.54C141.667 11.708 141.438 11.96 141.261 12.296C141.093 12.6227 141.009 13.0333 141.009 13.528C141.009 14.0133 141.093 14.424 141.261 14.76C141.438 15.096 141.667 15.3527 141.947 15.53C142.236 15.698 142.539 15.782 142.857 15.782C143.305 15.782 143.664 15.684 143.935 15.488C144.205 15.292 144.397 15.0213 144.509 14.676H146.063C145.876 15.4413 145.512 16.048 144.971 16.496C144.429 16.944 143.729 17.168 142.871 17.168ZM148.059 17V6.92H149.543V12.968L152.203 10.056H154.065L151.167 13.136V13.248L154.443 17H152.637L149.543 13.43V17H148.059Z" fill="#E3A300" />
            </svg>

          </div>
          <div className="flex justify-start w-full">
            <input
              type="text"
              className="flex justify-start w-[500px] py-2 p-2  rounded-sm bg-[#1A1A1A]"
              placeholder="Enter staking amount"
              onChange={handleVoteChange}
            ></input>
            <button className="ml-2 px-6 py-1 rounded-sm bg-white text-black" onClick={vote}>
              Vote
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Question;
