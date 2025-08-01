// import React, { useState } from "react";
// import axios from "axios";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const loginUser = async (e) => {
//     // e.preventDefault();
//     // try {
//     //   const res = await axios.post("http://localhost:5000/api/auth/login", {
//     //     email,
//     //     password,
//     //   });
//     //   localStorage.setItem("token", res.data.token);
//     //   alert("Login successful!");
//     //   // Optionally redirect here
//     // } catch (err) {
//     //   alert("Invalid credentials");
//     // }
//   };

//   return (
//     <form onSubmit={loginUser} className="p-4 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="border p-2 w-full mb-2"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border p-2 w-full mb-2"
//       />
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//         Login
//       </button>
//     </form>
//   );
// }

import { useAuth } from '@/contexts/AuthContext';
import { AuthPage } from './AuthPage';
import { Dashboard } from './Dashboard';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  return user ? <Dashboard /> : <AuthPage />;
};

export default Index;