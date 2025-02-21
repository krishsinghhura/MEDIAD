"use client";
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Section - Image */}
        <div className="flex justify-center">
          <img
            src="https://imgs.search.brave.com/-IV0_eti-afwTBQBjdkU_7xnN51O9N_nj2JXxbpp724/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8yLzJlL0Nv/bW11bml0eV9IZWFs/dGhfQWR2b2NhdGVf/LV9UaGVfTm91bl9Q/cm9qZWN0LnN2Zy82/NDBweC1Db21tdW5p/dHlfSGVhbHRoX0Fk/dm9jYXRlXy1fVGhl/X05vdW5fUHJvamVj/dC5zdmcucG5n"
            alt="Mental health awareness"
            className="rounded-lg shadow-xl w-[600px] h-[400px] object-cover"
          />
        </div>

        {/* Right Section - Text */}
        <div className="p-8 rounded-xl text-center md:text-left">
          <h1 className="text-4xl font-bold">About Medaid</h1>
          <p className="mt-4 text-lg text-gray-700">
            Medaid is dedicated to mental health awareness and well-being. We
            strive to create a supportive platform where individuals can access
            reliable resources, professional help, and a community that
            understands. Our goal is to break the stigma and provide accessible
            mental health support to everyone.
          </p>

          <p className="mt-4 text-lg text-gray-700">
            Whether you're seeking guidance, support, or just a place to
            connect, Medaid is here for you. Join us in making mental health a
            priority.
          </p>
        </div>
      </div>
    </div>
  );
}
