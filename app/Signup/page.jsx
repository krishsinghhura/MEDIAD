"use client";
import { useState } from "react";
import styles from "./Signup.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function SignUp() {
  const router = useRouter();  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    contactNo: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form validation logic here
    console.log("Form Submitted", formData);
    
    const res = await fetch("/api/signup",{
       method : "POST",
       headers : {"content-Type" : "application/json"},
       body : JSON.stringify(formData),
    })

    const data = await res.json();

    if(res.ok){
        toast.success("User created successfully");
        router.push('/login');
    }else{
        toast.error("Error occured");
        console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Sign Up</h2>

        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className={styles.input} required />

        <input type="email" name="email" placeholder="Email" onChange={handleChange} className={styles.input} required />

        <input type="number" name="age" placeholder="Age" onChange={handleChange} className={styles.input} required />

        <input type="tel" name="contactNo" placeholder="Contact No" onChange={handleChange} className={styles.input} required />

        <input type="password" name="password" placeholder="Password" onChange={handleChange} className={styles.input} required />

        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className={styles.input} required />

        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
}
