import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItemsThunk } from "../features/items/itemsSlice";
import { RootState } from "../store/store";

export default function ItemsList() {
  const dispatch = useDispatch();
  const items = useSelector((s: RootState) => s.items.items);

  useEffect(() => {
    dispatch(fetchItemsThunk() as any);
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl mb-4">Items</h2>
      <ul>
        {items.map((it: any) => (
          <li key={it.id} className="p-4 mb-2 bg-white rounded shadow">
            <div className="font-bold">{it.name}</div>
            <div>{it.description}</div>
            <div className="text-sm text-gray-500">₹{it.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
