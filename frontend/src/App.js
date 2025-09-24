import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // <-- include Navigate
import Register from "./components/Register";
import Login from "./components/Login";
import StudentForm from "./components/StudentForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* default redirect */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studentform" element={<StudentForm />} />
      </Routes>
    </BrowserRouter>
  );
}