"use client";
import { foodsData } from "@/constants/foods";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MealTracker() {
  const [age, setAge] = useState("");
  const [dailyCalories, setDailyCalories] = useState(null);
  const [food, setFood] = useState("");
  const [calorieIntake, setCalorieIntake] = useState(0);

  const calculateCalories = () => {
    if (!age) return;
    const baseCalories = 1800 + age * 10;
    setDailyCalories(baseCalories);
  };

  const fetchCalories = async () => {
    if (!food) return;

    try {
      const matchingFoods = foodsData.foods.filter((item) =>
        item.name.toLowerCase().includes(food.toLowerCase())
      );

      if (matchingFoods.length === 0) {
        console.error(`No data found for food: ${food}`);
        return;
      }

      const foodItem = matchingFoods[0];
      const calories = foodItem.calories;
      setCalorieIntake((prev) => prev + Number(calories));
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800 flex flex-col lg:flex-row items-center justify-center p-8">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">Meal Tracker</h1>

        {/* Age Input */}
        <div className="flex flex-col items-center gap-4 mb-6 w-full">
          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full max-w-xs px-4 py-2 border-2 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={calculateCalories}
            className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
          >
            Get Daily Calorie Need
          </button>
        </div>

        {dailyCalories && (
          <p className="text-lg font-semibold">
            Your daily calorie requirement:{" "}
            <span className="text-blue-600">{dailyCalories} kcal</span>
          </p>
        )}

        {/* Food Input */}
        <div className="flex flex-col items-center gap-4 mt-6 w-full">
          <input
            type="text"
            placeholder="Enter food name"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            className="w-full max-w-xs px-4 py-2 border-2 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchCalories}
            className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
          >
            Add Meal
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md bg-gray-300 rounded-full h-6 mt-6 overflow-hidden shadow-inner">
          <div
            className="bg-blue-500 h-full transition-all duration-500"
            style={{ width: `${(calorieIntake / dailyCalories) * 100}%` }}
          ></div>
        </div>

        <p className="mt-4 text-lg font-semibold">
          Total Calories Consumed:{" "}
          <span className="text-blue-600">{calorieIntake} kcal</span>
        </p>
      </div>

      {/* Right Section - Image */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
        <img
          src="/placeholder-image.jpg"
          alt="Meal Tracker Illustration"
          className="w-3/4 lg:w-2/3 rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
