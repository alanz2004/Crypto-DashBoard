import ganache from "ganache";
import { BrowserProvider, ContractFactory, Signer } from "ethers";
import solc from "solc";
import fs from "fs";
import path from "path";

let provider: BrowserProvider;
let signer: Signer;

// Start Ganache and initialize blockchain
export async function initBlockchain() {
  // Start Ganache in-memory blockchain
  const ganacheProvider = ganache.provider();

  // In ethers v6 use BrowserProvider instead of Web3Provider
  provider = new BrowserProvider(ganacheProvider as any);

  const accounts = await provider.listAccounts();
  signer = await provider.getSigner(accounts[0].address);

  console.log("Blockchain started. Admin account:", accounts[0].address);
}

// Compile contract using solc
export function compileContract() {
  const contractPath = path.resolve(__dirname, "../contracts/Project.sol");
  const source = fs.readFileSync(contractPath, "utf8");

  const input = {
    language: "Solidity",
    sources: {
      "Project.sol": { content: source },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  if (!output.contracts || !output.contracts["Project.sol"] || !output.contracts["Project"]) {
    throw new Error("Contract compilation failed. Check your Project.sol file.");
  }

  const contractFile = output.contracts["Project.sol"]["Project"];
  return {
    abi: contractFile.abi,
    bytecode: contractFile.evm.bytecode.object,
  };
}

// Deploy new project contract
export async function deployProjectContract(name: string, admin: string) {
  const { abi, bytecode } = compileContract();

  const factory = new ContractFactory(abi, bytecode, signer);
  const contract = await factory.deploy(name, admin);

  // In v6 deployment waits automatically, no .deployed()
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("Project contract deployed at:", address);

  return { address, abi };
}

// Export provider & signer for other files
export { provider, signer };