"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNavigation = (category) => {
    setLoading(true);
    setTimeout(() => {
      router.push(`/dashboard/${category}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-blue-900">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Dashboard</h1>
      <p className="text-lg text-gray-700 mb-6">Select an option</p>

      <div className="flex gap-4">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <button
              className="px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-500 transition-all"
              onClick={() => handleNavigation("sleep")}
            >
              Sleep
            </button>
            <button
              className="px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-500 transition-all"
              onClick={() => handleNavigation("meal")}
            >
              Meal
            </button>
            <button
              className="px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-500 transition-all"
              onClick={() => handleNavigation("meditation")}
            >
              Meditation
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
