"use client";

import { useState } from "react";

export default function AuthPage() {
  const [role, setRole] = useState<"customer" | "worker">("customer");
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      console.log(`Register ${role}:`, formData);
      alert(`Registered ${role} successfully!`);
    } else {
      console.log(`Login ${role}:`, formData);
      alert(`Logged in as ${role}!`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="flex mb-4">
          <button
            onClick={() => setRole("customer")}
            className={`flex-1 py-2 ${role === "customer" ? "border-b-2 border-blue-500 font-bold" : ""}`}
          >
            Customer
          </button>
          <button
            onClick={() => setRole("worker")}
            className={`flex-1 py-2 ${role === "worker" ? "border-b-2 border-blue-500 font-bold" : ""}`}
          >
            Worker
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4">{isRegister ? "Register" : "Login"} as {role}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button className="text-blue-500 underline" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
