"use client";
import MealTracker from "@/components/meal/page";
import Sleep from "@/components/sleep/page";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { category } = useParams();

  return (
    <div className="min-h-screen bg-blue-100 text-gray-800 p-6">
      <h1 className="text-4xl font-bold text-sky-700 mb-4">MEDAID</h1>
      <p className="text-lg text-gray-700 mb-6">Welcome to the {category} section</p>
      
      <div className=" shadow-lg rounded-lg p-6">
        {category === "sleep" ? (
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
