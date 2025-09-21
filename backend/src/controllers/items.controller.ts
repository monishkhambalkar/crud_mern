import { Request, Response } from "express";
import pool from "../config/db";

export async function getItems(req: Request, res: Response) {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT id, name, description, price, created_at FROM items ORDER BY created_at DESC");
    res.json(result.rows);
  } finally {
    client.release();
  }
}

export async function getItemById(req: Request, res: Response) {
  const client = await pool.connect();
  try {
    const id = parseInt(req.params.id, 10);
    const result = await client.query("SELECT id, name, description, price, created_at FROM items WHERE id = $1", [id]);
    if (!result.rows.length) return res.status(404).json({ message: "Not found" });
    res.json(result.rows[0]);
  } finally {
    client.release();
  }
}

export async function createItem(req: Request, res: Response) {
  const { name, description, price } = req.body;
  if (!name) return res.status(400).json({ message: "name is required" });
  const client = await pool.connect();
  try {
    const result = await client.query(
      "INSERT INTO items (name, description, price) VALUES ($1, $2, $3) RETURNING id, name, description, price, created_at",
      [name, description || null, price || 0]
    );
    res.status(201).json(result.rows[0]);
  } finally {
    client.release();
  }
}

export async function updateItem(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  const { name, description, price } = req.body;
  const client = await pool.connect();
  try {
    const result = await client.query(
      "UPDATE items SET name=$1, description=$2, price=$3 WHERE id=$4 RETURNING id, name, description, price, created_at",
      [name, description || null, price || 0, id]
    );
    if (!result.rows.length) return res.status(404).json({ message: "Not found" });
    res.json(result.rows[0]);
  } finally {
    client.release();
  }
}

export async function deleteItem(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM items WHERE id = $1", [id]);
    res.json({ message: "Deleted" });
  } finally {
    client.release();
  }
}
