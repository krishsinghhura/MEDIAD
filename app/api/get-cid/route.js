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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    let user = searchParams.get("user");

    // ✅ Check if user address is provided
    if (!user) {
      return Response.json(
        { error: "User address is required" },
        { status: 400 }
      );
    }

    // ✅ Validate user address to avoid ENS resolution issues
    if (!ethers.isAddress(user)) {
      return Response.json(
        { error: "Invalid Ethereum address" },
        { status: 400 }
      );
    }

    // ✅ Pass the user address directly (prevents ENS resolution)
    const cids = await contract.getCIDs(user);

    return Response.json({ success: true, cids });
  } catch (error) {
    console.error("Error fetching CIDs:", error);
    return Response.json({ error: "Failed to fetch CIDs" }, { status: 500 });
  }
}
