"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

export default function SummaryCharts() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = window.location.pathname;
        const segments = path.split("/");
        const userId = segments[segments.length - 1];

        if (!userId) {
          console.error("User ID not found in URL");
          setSummary(null);
          setLoading(false);
          return;
        }

        const response = await axios.get(`/api/get-chats?userId=${userId}`);
        let summaryData = response.data.summary;

        if (typeof summaryData === "string") {
          summaryData = summaryData.trim();
          if (
            summaryData.startsWith("```json") &&
            summaryData.endsWith("```")
          ) {
            summaryData = summaryData.replace(/^```json|```$/g, "").trim();
          }
          try {
            summaryData = JSON.parse(summaryData);
          } catch (error) {
            console.error("Error parsing summary JSON:", error);
            summaryData = null;
          }
        }

        if (summaryData && typeof summaryData === "object") {
          setSummary(summaryData);
          await storeOnPinata(userId, summaryData); // Store data on Pinata
        } else {
          setSummary(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const storeOnPinata = async (userId, summaryData) => {
    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        {
          summary: summaryData,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          },
        }
      );

      const cid = response.data.IpfsHash; // Extract CID
      if (cid) {
        await storeCIDOnBlockchain(cid); // Push CID to blockchain
      }
    } catch (error) {
      console.error(
        "Error storing data on Pinata:",
        error.response?.data || error
      );
    }
  };

  const storeCIDOnBlockchain = async (cid) => {
    try {
      const response = await axios.post("/api/store-cid", { cid });
    } catch (error) {
      console.error(
        "Error pushing CID to blockchain:",
        error.response?.data || error
      );
    }
  };

  if (loading) {
    return <div className="text-white p-6">Loading...</div>;
  }

  if (!summary) {
    return <div className="text-white p-6">No data available</div>;
  }

  const data = [
    { name: "Stress", value: summary.stress },
    { name: "Peace", value: summary.peace },
    { name: "Anxiety", value: summary.anxiety },
    { name: "Depression", value: summary.depression },
  ];

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white p-6">
      <div className="w-1/2 p-6 text-lg">
        <h1 className="text-2xl font-bold mb-4">Summary</h1>
        <p>
          <strong>Analysis:</strong> {summary.analysis}
        </p>
      </div>
      <div className="w-1/2 flex flex-col items-center">
        <ResponsiveContainer width="80%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="80%" height={150}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
