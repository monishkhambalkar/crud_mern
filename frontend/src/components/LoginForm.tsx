import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../features/auth/authSlice";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginThunk({ email, password }));
      // success
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Login</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 p-2 border" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full mb-2 p-2 border" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}
