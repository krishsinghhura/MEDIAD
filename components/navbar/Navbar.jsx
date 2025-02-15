"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Chat", url: "/chat" },
  { id: 3, title: "Dashboard", url: "/dashboard" },
  { id: 4, title: "Reports", url: "/reports" },
  { id: 5, title: "About", url: "/about" },
  { id: 6, title: "Contact", url: "/contact" },
  { id: 7, title: "Sign-up", url: "/Signup" },
];

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    };
    fetchUser();
  }, []);

  const handleLogOut = async () => {
    await fetch("/api/logout", { method: "POST" });
    setIsLoggedIn(true);
    alert("User logged out");
  };

  return (
    <nav className="bg-blue-100 text-gray-800 shadow-md py-4 px-6 flex justify-between items-center w-full">
      <Link href="/" className="text-2xl font-bold text-sky-700">
        Medaid
      </Link>
      <div className="hidden md:flex space-x-6">
        {links.map((link) => (
          <Link 
            key={link.id} 
            href={link.url} 
            className="text-lg text-gray-700 hover:text-sky-600 transition">
            {link.title}
          </Link>
        ))}
      </div>
      <button 
        onClick={handleLogOut} 
        className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;