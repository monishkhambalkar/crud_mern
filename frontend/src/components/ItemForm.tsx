import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createItemThunk } from "../features/items/itemsSlice";

export default function ItemForm() {
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState(0);
  const dispatch = useDispatch();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createItemThunk({ name, description, price }) as any);
    setName(""); setDescription(""); setPrice(0);
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6">
      <h3 className="mb-3">Create Item</h3>
      <input className="w-full mb-2 p-2 border" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="w-full mb-2 p-2 border" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <input type="number" step="0.01" value={price} onChange={e=>setPrice(parseFloat(e.target.value))} className="w-full mb-2 p-2 border" />
      <button className="bg-indigo-600 text-white px-4 py-2 rounded">Create</button>
    </form>
  );
}
