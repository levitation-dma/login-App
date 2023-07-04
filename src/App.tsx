import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import ForgotPassword from './ForgotPassword';
import MultiStepForm from './MultiStepForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/multi-step-form" element={<MultiStepForm />} />
      </Routes>
    </Router>
  );
};

export default App;
