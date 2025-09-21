import { Request, Response } from "express";
import pool from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = 10;

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body;

  console.log(req.body);  return false

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const client = await pool.connect();

  console.log("Hello check register");
  console.log(client); return false;

  try {
    const exists = await client.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);
    if (exists.rows.length) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await client.query(
      `INSERT INTO users (email, password, name) 
       VALUES ($1, $2, $3) 
       RETURNING id, email, name`,
      [email, hashed, name || null] // ✅ use hashed password
    );

    const user = result.rows[0];
    return res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating user" });
  } finally {
    client.release();
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const client = await pool.connect();

  try {
    const result = await client.query(
      "SELECT id, email, password, name FROM users WHERE email = $1",
      [email]
    );

    if (!result.rows.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    return res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Login error" });
  } finally {
    client.release();
  }
}
