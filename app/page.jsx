"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  const handleLogin = async () => {
    router.push("/login");
  }
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
      else{
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Medaid</h1>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vitae
          impedit repellendus soluta quae porro, eos sint explicabo vel sunt
          minima, veritatis, iusto sequi commodi beatae tenetur architecto saepe
          et.
        </p>

        {/* we will show this button only when the user is not logged in else we will not show this  */}
        {
          user ? (
            <p>Welcome Back {user.fullName}</p>
          ) : (
            <button className={styles.button} onClick={handleLogin}>Log in</button>
          )
        }
      </div>

      <div className={styles.imageContainer}>
        <Image
          src="/hero.png"
          alt="image"
          className={styles.img}
          width={600}
          height={400}
        />
      </div>
    </div>
  );
}
