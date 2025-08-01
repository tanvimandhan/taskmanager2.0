import React from 'react'
// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Index';
import NotFound from './Pages/NotFound';
import Index from './Pages/Index';
import { AuthProvider } from './contexts/AuthContext';
// import Register from './pages/Register'; // Optional, if you have it
// import Home from './pages/Home'; // Optional, after login

function App() {
  return (
      <AuthProvider>
        <Routes>
        {/* Redirect root (/) to login */}
        {/* <Route path="/" element={<Navigate to="/login" />} /> 

        {/* Login page */}
        {/* <Route path="/login" element={<Login />} /> */}
         <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </AuthProvider>
      
    
  );
}

export default App;
