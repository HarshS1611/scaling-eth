import AHackathonManager from "../artifacts/contracts/HackathonManager.sol/AHackathonManager.json"
import CHackathonManager from "../artifacts/contracts/HackathonManager.sol/CHackathonManager.json"
import { Acontract_add, Ccontract_add } from "../artifacts/config";

export const chainIdToContractMap = {
    421614: {
        abi: AHackathonManager.abi,
        address: Acontract_add,
    },
    1115: {
        abi: CHackathonManager.abi, // Assuming you have a different ABI for this chain
        address: Ccontract_add,
    },
    10200: {
        abi: CHackathonManager.abi, // Assuming you have a different ABI for this chain
        address: Ccontract_add,
    },
    2710: {
        abi: CHackathonManager.abi, // Assuming you have a different ABI for this chain
        address: Ccontract_add,
    },
    202402021700: {
        abi: CHackathonManager.abi, // Assuming you have a different ABI for this chain
        address: Ccontract_add,
    },
    314159: {
        abi: CHackathonManager.abi, // Assuming you have a different ABI for this chain
        address: Ccontract_add,
    }
};