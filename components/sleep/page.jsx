"use client";
import { useState, useEffect } from "react";
import styles from "./sleep.module.css";

export default function Sleep() {
  const [bedtime, setBedtime] = useState("");
  const [wakeTime, setWakeTime] = useState("");

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
    } else if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const scheduleNotification = (time, message) => {
    const now = new Date();
    const targetTime = new Date(now.toDateString() + " " + time);

    if (targetTime < now) {
      targetTime.setDate(targetTime.getDate() + 1); // Set it for the next day if time has passed
    }

    const delay = targetTime - now;
    console.log(`Notification for ${message} scheduled in ${delay / 1000} seconds`);

    setTimeout(() => {
      new Notification("Sleep Reminder", { body: message });
    }, delay);
  };

  const handleSetAlarm = () => {
    if (bedtime) {
      scheduleNotification(bedtime, "It's time to sleep! Get some rest. 😴");
    }
    if (wakeTime) {
      scheduleNotification(wakeTime, "Good morning! Time to wake up. ☀️");
    }
    alert("Alarms set successfully!");
  };

  return (
    <div className={styles.container}>
      <h1>Set Your Sleep Schedule</h1>

      <label className={styles.label}>Bedtime:</label>
      <input className={styles.input} type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)} />

      <label className={styles.label}>Wake-up Time:</label>
      <input className={styles.input} type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} />

      <button onClick={handleSetAlarm} className={styles.button}>Set Alarm</button>
    </div>
  );
}
