"use client";
import { useState, useEffect } from "react";

export default function Sleep() {
  const [bedtime, setBedtime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
    } else if (Notification.permission === "granted") {
      setNotificationsEnabled(true);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setNotificationsEnabled(true);
        }
      });
    }
  }, []);

  const scheduleNotification = (time, message) => {
    if (!notificationsEnabled) {
      alert("Enable notifications for sleep reminders.");
      return;
    }

    const now = new Date();
    const targetTime = new Date(now.toDateString() + " " + time);

    if (targetTime < now) {
      targetTime.setDate(targetTime.getDate() + 1); // Schedule for next day if time has passed
    }

    const delay = targetTime - now;
    console.log(
      `Notification for ${message} scheduled in ${Math.round(
        delay / 1000
      )} seconds`
    );

    setTimeout(() => {
      new Notification("Sleep Reminder", { body: message });
    }, delay);
  };

  const handleSetAlarm = () => {
    if (!bedtime && !wakeTime) {
      alert("Please set at least one time!");
      return;
    }

    if (bedtime) {
      scheduleNotification(bedtime, "It's time to sleep! Get some rest. 😴");
    }
    if (wakeTime) {
      scheduleNotification(wakeTime, "Good morning! Time to wake up. ☀️");
    }
    alert("Alarms set successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Sleep Scheduler</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Bedtime:</label>
          <input
            type="time"
            value={bedtime}
            onChange={(e) => setBedtime(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Wake-up Time:
          </label>
          <input
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSetAlarm}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-bold rounded-lg shadow-md"
        >
          Set Alarm
        </button>
      </div>
    </div>
  );
}
