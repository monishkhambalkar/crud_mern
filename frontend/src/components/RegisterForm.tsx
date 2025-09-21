import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerThunk } from "../features/auth/authSlice";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(registerThunk({ email, password, name }));
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Register</h2>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full mb-2 p-2 border" />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 p-2 border" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full mb-2 p-2 border" />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}
