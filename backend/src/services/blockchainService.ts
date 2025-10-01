import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { ethers } from "ethers";

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

  // Load compiled contract
  const contractPath = path.resolve(__dirname, "../contracts/Project.sol");
  const source = fs.readFileSync(contractPath, "utf8");

  // Compile using solc (or you can precompile and import ABI/bytecode)
  const solc = await import("solc");
  const input = {
    language: "Solidity",
    sources: { "Project.sol": { content: source } },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const contractFile = output.contracts["Project.sol"]["Project"];
  const abi = contractFile.abi;
  const bytecode = contractFile.evm.bytecode.object;

  // Create factory and deploy
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const contract = await factory.deploy(name, admin);

  await contract.waitForDeployment(); // ethers v6
  console.log(`✅ Contract deployed at: ${contract.target}`);

  return contract;
}