"use client";
import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  };

  return (
    <div className="min-h-screen bg-[#f5f1e3] py-16 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-[#1a3d35] mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Have a question, partnership idea, or just want to say hi? Fill out
          the form below and our team will get back to you soon.
        </p>
        {submitted ? (
          <div className="text-green-600 text-center font-semibold py-8">
            Thank you for reaching out! We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1a3d35] mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full text-gray-600 px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-yellow-400 transition"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a3d35] mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full text-gray-600 px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-yellow-400 transition"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a3d35] mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full text-gray-600 px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-yellow-400 transition"
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-[#1a3d35] py-3 rounded-lg font-semibold hover:bg-yellow-500 transition text-lg"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
