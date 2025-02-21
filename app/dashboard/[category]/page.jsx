"use client";
import MealTracker from "@/components/meal/page";
import Sleep from "@/components/sleep/page";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const Page = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate a loading delay
    return () => clearTimeout(timer);
  }, [category]);

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">MEDAID</h1>
      <p className="text-lg text-gray-600 mb-6">
        Welcome to the {category} section
      </p>

      <div className="shadow-lg rounded-lg p-6 bg-blue-50">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : category === "sleep" ? (
          <Sleep />
        ) : category === "meal" ? (
          <MealTracker />
        ) : (
          <Meditation />
        )}
      </div>
    </div>
  );
};

export default Page;
