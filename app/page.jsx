"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Section - Text */}
        <div className="p-8 rounded-xl text-center md:text-left">
          <h1 className="text-4xl font-bold">Medaid</h1>
          <p className="mt-4 text-lg text-gray-700">
            Your trusted companion for mental wellness. Connect, share, and seek
            help in a safe and supportive environment.
          </p>

          {/* Conditional Rendering for Login */}
          {user ? (
            <p className="mt-4 text-xl font-semibold">
              Welcome back,{" "}
              <span className="text-blue-600">{user.fullName}</span>!
            </p>
          ) : (
            <button
              className="mt-6 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
              onClick={handleLogin}
            >
              Log in
            </button>
          )}
        </div>

        {/* Right Section - Image */}
        <div className="flex justify-center">
          <img
            src="https://imgs.search.brave.com/OV2stZe2Ho0WJKMUijQFuWkGqnEHup-axYVgL-pv-5w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvbWVudGFsLWhl/YWx0aC1waWN0dXJl/cy1pOG92OHdzM2hm/dzJ2NGl4LmpwZw"
            alt="Mental health image"
            className="rounded-lg shadow-xl w-[600px] h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
