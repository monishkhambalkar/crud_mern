import React, { useState } from "react";
import api from "../api/api";
import { Navigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [redirect, setRedirect] = useState(false); // state to trigger redirect

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      alert(res.data.message);
      setRedirect(true); // trigger redirect
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  if (redirect) {
    return <Navigate to="/studentform" />; // redirect after successful registration
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
}
