import pool from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import generateToken from "../utils/generateToken.js";

// POST /api/auth/register
export const register = async (req, res, next) => {
    try {
        const { name, email, phone, password, state, district } = req.body;

        if (!name || !phone || !password) {
            return res.status(400).json({ message: "Name, phone, and password are required" });
        }

        // Check existing user
        const existing = await pool.query("SELECT id FROM users WHERE phone = $1 OR email = $2", [phone, email || null]);
        if (existing.rows.length > 0) {
            return res.status(409).json({ message: "User with this phone/email already exists" });
        }

        const hashed = await hashPassword(password);
        const result = await pool.query(
            `INSERT INTO users (name, email, phone, password, state, district)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, phone, role, state, district`,
            [name, email || null, phone, hashed, state || null, district || null]
        );

        const user = result.rows[0];
        const token = generateToken(user);

        res.status(201).json({ user, token });
    } catch (err) {
        next(err);
    }
};

// POST /api/auth/login
export const login = async (req, res, next) => {
    try {
        const { phone, email, password } = req.body;
        const identifier = phone || email;

        if (!identifier || !password) {
            return res.status(400).json({ message: "Phone/email and password are required" });
        }

        const result = await pool.query(
            "SELECT * FROM users WHERE phone = $1 OR email = $1",
            [identifier]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = result.rows[0];
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);
        const { password: _, ...userData } = user;

        res.json({ user: userData, token });
    } catch (err) {
        next(err);
    }
};

// GET /api/auth/me
export const getMe = async (req, res, next) => {
    try {
        const result = await pool.query(
            "SELECT id, name, email, phone, role, state, district, created_at FROM users WHERE id = $1",
            [req.user.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};
