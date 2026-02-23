require("dotenv").config();
const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 5000;

// Test DB connection and start server
const start = async () => {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("✅ Database connected at:", result.rows[0].now);

        app.listen(PORT, () => {
            console.log(`🚀 BigHaat Backend running on http://localhost:${PORT}`);
            console.log(`📡 API Base: http://localhost:${PORT}/api`);
        });
    } catch (err) {
        console.error("❌ Failed to connect to database:", err.message);
        console.log("🔄 Starting server without database...");

        app.listen(PORT, () => {
            console.log(`🚀 BigHaat Backend running on http://localhost:${PORT} (no DB)`);
        });
    }
};

start();
