import api from "../../api/axios";

export const fetchItems = () => api.get("/items");
export const fetchItem = (id: number) => api.get(`/items/${id}`);
export const createItem = (payload: any) => api.post("/items", payload);
export const updateItem = (id: number, payload: any) => api.put(`/items/${id}`, payload);
export const deleteItem = (id: number) => api.delete(`/items/${id}`);
