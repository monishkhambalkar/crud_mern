import React from "react";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ItemsList from "./components/ItemsList";
import ItemForm from "./components/ItemForm";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <LoginForm />
            <RegisterForm />
          </div>
          <div>
            <ItemForm />
            <ItemsList />
          </div>
        </div>
      </div>
    </div>
  );
}
