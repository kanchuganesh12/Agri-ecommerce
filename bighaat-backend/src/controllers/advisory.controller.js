import pool from "../config/db.js";

// GET /api/advisory?crop=rice&stage=germination
export const getAdvisory = async (req, res, next) => {
    try {
        const { crop, stage } = req.query;
        let query = `SELECT a.*, c.name as crop_name FROM advisory a JOIN crops c ON c.id = a.crop_id`;
        const params = [];
        const conditions = [];
        let idx = 1;

        if (crop) { conditions.push(`c.name ILIKE $${idx++}`); params.push(crop); }
        if (stage) { conditions.push(`a.growth_stage ILIKE $${idx++}`); params.push(stage); }

        if (conditions.length) query += " WHERE " + conditions.join(" AND ");
        query += " ORDER BY a.created_at DESC";

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) { next(err); }
};

// GET /api/advisory/stages/:crop
export const getCropStages = async (req, res, next) => {
    try {
        const { crop } = req.params;
        const { stage } = req.query;

        let query = `SELECT a.* FROM advisory a JOIN crops c ON c.id = a.crop_id WHERE c.name ILIKE $1`;
        const params = [crop];

        if (stage) {
            query += ` AND a.growth_stage ILIKE $2`;
            params.push(stage);
        }

        const result = await pool.query(query, params);

        if (result.rows.length === 0) {
            return res.json({ crop, stage, pests: [], fertilizers: [], spraySchedule: [], tips: [] });
        }

        const row = result.rows[0];
        res.json({
            crop,
            stage: row.growth_stage,
            pests: row.pest_alert ? row.pest_alert.split(",").map((s) => s.trim()) : [],
            fertilizers: row.fertilizer_recommendation ? row.fertilizer_recommendation.split(",").map((s) => s.trim()) : [],
            spraySchedule: row.spray_schedule ? row.spray_schedule.split(";").map((s) => s.trim()) : [],
            tips: row.tips ? row.tips.split(";").map((s) => s.trim()) : [],
            weatherAdvice: row.weather_advice || "",
        });
    } catch (err) { next(err); }
};

// GET /api/advisory/pests/:crop
export const getPestAlerts = async (req, res, next) => {
    try {
        const { crop } = req.params;
        const result = await pool.query(
            `SELECT a.pest_alert, a.growth_stage FROM advisory a JOIN crops c ON c.id = a.crop_id WHERE c.name ILIKE $1`,
            [crop]
        );

        const alerts = [];
        result.rows.forEach((row) => {
            if (row.pest_alert) {
                row.pest_alert.split(",").forEach((pest) => {
                    alerts.push({
                        name: pest.trim(),
                        severity: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
                        description: `${pest.trim()} can cause significant yield loss. Monitor regularly.`,
                        remedy: "Apply recommended pesticide. Consult local agricultural officer.",
                    });
                });
            }
        });

        res.json(alerts);
    } catch (err) { next(err); }
};
