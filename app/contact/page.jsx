"use client";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Section - Contact Form */}
        <div className="p-8 rounded-xl shadow-lg bg-gray-100 w-full">
          <h1 className="text-4xl font-bold text-center">Contact Us</h1>
          <p className="text-lg text-gray-700 mt-2 text-center">
            Have questions? Reach out to us!
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className="flex justify-center">
          <img
            src="https://imgs.search.brave.com/Hzs0H1XfWzTEEa0WrJxu-wMDGprZxQztAH_l9RJM5GU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/MzM3Mzk1NC9waG90/by9wcm9maWxlLXZp/ZXctYW5kLW1lbnRh/bC1pbGxuZXNzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1w/N2d0bkhlVzZKelVh/SzRZNkI0X19zSlRm/RmVPbC1CUEMxbnY0/TzdZeTZrPQ"
            alt="Contact Us"
            className="rounded-lg shadow-xl w-[600px] h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
