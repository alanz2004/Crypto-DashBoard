import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { ethers } from "ethers";
import solc from "solc"; // ESM import

// If you were using __dirname, replace it with:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load precompiled ABI instead of recompiling each time
const abiPath = path.resolve(__dirname, "../artifacts/Project_sol_Project.abi");
const binPath = path.resolve(__dirname, "../artifacts/Project_sol_Project.bin");

if (!fs.existsSync(abiPath) || !fs.existsSync(binPath)) {
  throw new Error("❌ Missing ABI or BIN file. Run `npx solcjs --bin --abi contracts/Project.sol -o artifacts` first.");
}

const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
const bytecode = fs.readFileSync(binPath, "utf8");



let provider: ethers.JsonRpcProvider;
let signer: ethers.JsonRpcSigner;


export async function startHardhatNode() {
  return new Promise<void>((resolve, reject) => {
    const hardhatNode = spawn("npx hardhat node", { shell: true, stdio: "inherit" });

    hardhatNode.on("error", (err) => reject(err));

    // Wait 3s for node to start
    setTimeout(() => resolve(), 3000);

    process.on("exit", () => hardhatNode.kill());
  });
}



/**
 * Initialize blockchain connection
 */
export async function initBlockchain() {

  await startHardhatNode();


  // Connect to local Hardhat/JSON-RPC node
  provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

  // Get the first account as signer (synchronous)
  signer = await provider.getSigner(0);

  console.log("✅ Blockchain initialized");
  console.log("Admin account:", await signer.getAddress());
}

/**
 * Get the signer
 */
export function getSigner(): ethers.JsonRpcSigner {
  if (!signer) throw new Error("Blockchain not initialized");
  return signer;
}

/**
 * Deploy Project contract
 */
export async function deployProjectContract(name: string, admin: string) {
  if (!signer) throw new Error("Blockchain not initialized");

  // Deploy contract using precompiled ABI & Bytecode
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const contract = await factory.deploy(name, admin);
  await contract.waitForDeployment();

  console.log(`✅ Contract deployed at: ${contract.target}`);
  return contract;
}

/**
 * Add a new team member to the on-chain project contract.
 */
export const addMemberToContract = async (
  contractAddress: string,
  wallet: string,
  role: string
) => {
  try {
    const signer = getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    console.log(`🧩 Adding member to contract: ${wallet} (${role})`);
    const tx = await contract.addMember(wallet, role);
    await tx.wait();

    console.log("✅ Member added successfully to contract:", tx.hash);
    return tx;
  } catch (error: any) {
    console.error("❌ Error adding member to blockchain:", error);
    throw new Error(error.message);
  }
};