// src/components/Login.jsx
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Login({ setUser }) {
  const login = async () => {
    const res = await signInWithPopup(auth, provider);
    setUser(res.user);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button onClick={login} className="bg-blue-600 text-white px-6 py-2 rounded">
        Sign in with Google
      </button>
    </div>
  );
}
