import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Navbar() {
  const auth = useSelector((s: RootState) => s.auth);
  return (
    <nav className="p-4 bg-white shadow">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold">MyApp</div>
        <div>{auth.user ? `Hi, ${auth.user.name || auth.user.email}` : "Not logged in"}</div>
      </div>
    </nav>
  );
}
