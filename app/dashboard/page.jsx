"use client"
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./dashboard.module.css"

const page = () => {
  const router = useRouter();
  
  const handleNavigation = (category) => {
    router.push(`/dashboard/${category}`);
  }
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <p>Select an option</p>

      <div className={styles.options}>
        <button className={styles.button} onClick={() => handleNavigation("sleep")}>Sleep</button>
        <button className={styles.button} onClick={() => handleNavigation("meal")}>Meal</button>
        <button className={styles.button} onClick={() => handleNavigation("meditation")}>
          Meditation
        </button>
      </div>
    </div>
  );
};

export default page;
