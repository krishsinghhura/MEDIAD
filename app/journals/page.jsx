"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import axios from "axios";

export default function JournalEntries() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const connectWallet = async () => {
      if (!window.ethereum) {
        alert("MetaMask is required to use this feature.");
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    };

    connectWallet();
  }, []);

  useEffect(() => {
    if (!walletAddress) return;

    const fetchEntries = async () => {
      try {
        const response = await axios.get(`/api/get-cid?user=${walletAddress}`);
        if (response.data.success && Array.isArray(response.data.cids)) {
          const cids = response.data.cids;

          const validEntries = await Promise.all(
            cids.map(async (cid) => {
              if (!cid) return null;

              try {
                const fileResponse = await axios.get(
                  `https://yellow-rear-condor-657.mypinata.cloud/ipfs/${cid}`
                );

                if (fileResponse.data) {
                  return { ...fileResponse.data, cid };
                }
              } catch (err) {
                console.error(`Error fetching file for CID: ${cid}`, err);
              }

              return null;
            })
          );

          setEntries(validEntries.filter((entry) => entry !== null));
        } else {
          setEntries([]);
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
        setEntries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [walletAddress]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-400 tracking-wide">
        My Journal Entries
      </h1>

      {loading ? (
        <p className="text-lg text-gray-400 animate-pulse">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-lg text-gray-400">No journal entries found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-700 shadow-xl bg-gray-800/80 backdrop-blur-lg transform transition-all duration-300 hover:scale-105 hover:border-blue-400 cursor-pointer"
              onClick={() =>
                router.push(`/journal/${entry.userId || entry.cid}`)
              }
            >
              <h2 className="text-2xl font-semibold text-blue-300 mb-2">
                Journal Entry {index + 1}
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                {entry.summary?.analysis || "No analysis available"}
              </p>
              <p className="text-xs text-gray-500 mt-4">CID: {entry.cid}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
