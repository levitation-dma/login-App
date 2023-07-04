import React, { useState } from 'react';
import axios from 'axios';
import './styles/tailwind.css';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        // Login success
        const authToken = response.data.authToken;
        // Store the authentication token in local storage or state
        localStorage.setItem('authToken', authToken);
        setLoginStatus('Login successful');
        console.log('Login successful'); 
      } else {
        // Login failed
        setLoginStatus('Login failed');
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginStatus('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Login Page</h1>
      <input
        type="email"
        placeholder="Email"
        className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
        value={password}
        onChange={handlePasswordChange}
      />
      <button
        className="bg-blue-500 text-white rounded px-4 py-2"
        onClick={handleLogin}
      >
        Login
      </button>
      {loginStatus && <p style={{ color: 'inherit', marginTop: '12px', textDecoration: 'none' }}>{loginStatus}</p>}
    </div>
  );
};

export default LoginPage;





