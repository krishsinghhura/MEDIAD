"use client";
import { useState } from "react";
import styles from "./login.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form validation logic here
    console.log("Form Submitted", formData);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("User Logged in");
      router.push("/");
    } else {
      alert("error occured");
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Log in</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className={styles.input}
          required
        />

        <button type="submit" className={styles.button}>
          Log in
        </button>
      </form>
    </div>
  );
}
