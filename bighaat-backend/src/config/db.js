const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "app_user",
    password: process.env.DB_PASS || "716291",
    database: process.env.DB_NAME || "agri_ecommerce",
});

pool.on("connect", () => {
    console.log("✅ Connected to PostgreSQL database");
});

pool.on("error", (err) => {
    console.error("❌ PostgreSQL connection error:", err.message);
});

module.exports = pool;
