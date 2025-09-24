import React, { useState } from "react";
import api, { setAuthToken } from "../api/api";
import { Navigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [redirect, setRedirect] = useState(false); 

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await api.post("/auth/login", form);
        setAuthToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        alert("Login Successful");
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to="/studentform" />; // redirect after successful registration
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    );
}
