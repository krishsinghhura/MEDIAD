import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  "https://api.avax-test.network/ext/bc/C/rpc"
);
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;

// ABI of the Smart Contract
const abi = [
  "function storeCID(string memory _cid) public",
  "function getCIDs(address user) public view returns (string[] memory)",
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

export async function POST(req) {
  try {
    const { cid } = await req.json();
    if (!cid)
      return Response.json({ error: "CID is required" }, { status: 400 });

    const tx = await contract.storeCID(cid);
    await tx.wait();

    return Response.json({
      success: true,
      message: "CID stored on blockchain",
      txHash: tx.hash,
    });
  } catch (error) {
    console.error("Error storing CID:", error);
    return Response.json({ error: "Failed to store CID" }, { status: 500 });
  }
}
