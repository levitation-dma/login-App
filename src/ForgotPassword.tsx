import React, { useState } from "react";
import { Link } from "react-router-dom";
import './styles/tailwind.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your logic here for handling the form submission
    // For this example, let's just log the entered email
    console.log(email);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 mb-4"
        />
        <button
          className="bg-blue-500 text-white rounded px-4 py-2"
          type="submit"
        >
          Reset Password
        </button>
      </form>
      <Link to="/" style={{ color: 'inherit', marginTop: '12px', textDecoration: 'none' }}>
        Go back to Login
      </Link>
    </div>
  );
};

export default ForgotPassword;
