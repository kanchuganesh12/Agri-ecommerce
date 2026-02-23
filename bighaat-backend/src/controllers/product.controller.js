import pool from "../config/db.js";

// GET /api/products — with filters
export const getProducts = async (req, res, next) => {
    try {
        const { crop, brand, category, min, max, sort, q, page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;
        let conditions = [];
        let params = [];
        let idx = 1;

        if (category) { conditions.push(`p.category = $${idx++}`); params.push(category); }
        if (brand) { conditions.push(`p.brand = $${idx++}`); params.push(brand); }
        if (min) { conditions.push(`p.discount_price >= $${idx++}`); params.push(Number(min)); }
        if (max) { conditions.push(`p.discount_price <= $${idx++}`); params.push(Number(max)); }
        if (q) { conditions.push(`(p.name ILIKE $${idx} OR p.brand ILIKE $${idx})`); params.push(`%${q}%`); idx++; }

        let joinClause = "";
        if (crop) {
            joinClause = `JOIN product_crops pc ON pc.product_id = p.id JOIN crops c ON c.id = pc.crop_id`;
            conditions.push(`c.name ILIKE $${idx++}`);
            params.push(crop);
        }

        const where = conditions.length ? "WHERE " + conditions.join(" AND ") : "";

        let orderBy = "ORDER BY p.created_at DESC";
        if (sort === "price_asc") orderBy = "ORDER BY p.discount_price ASC";
        else if (sort === "price_desc") orderBy = "ORDER BY p.discount_price DESC";
        else if (sort === "newest") orderBy = "ORDER BY p.created_at DESC";
        else if (sort === "rating") orderBy = "ORDER BY p.id DESC";

        // Count
        const countQuery = `SELECT COUNT(*) FROM products p ${joinClause} ${where}`;
        const countResult = await pool.query(countQuery, params);
        const total = parseInt(countResult.rows[0].count);

        // Products
        const query = `SELECT p.* FROM products p ${joinClause} ${where} ${orderBy} LIMIT $${idx++} OFFSET $${idx++}`;
        params.push(Number(limit), Number(offset));
        const result = await pool.query(query, params);

        // Map fields for frontend compatibility
        const products = result.rows.map((p) => ({
            id: p.id,
            name: p.name,
            brand: p.brand,
            category: p.category,
            price: parseFloat(p.discount_price || p.price),
            originalPrice: parseFloat(p.price),
            discount: p.price > 0 ? Math.round(((p.price - (p.discount_price || p.price)) / p.price) * 100) : 0,
            rating: 4.4,
            reviewCount: Math.floor(Math.random() * 500) + 10,
            image: p.image_url,
            size: p.size || "—",
            stock: p.stock,
            description: p.description,
            dosage_guide: p.dosage_guide,
        }));

        res.json({ products, total, page: Number(page), limit: Number(limit) });
    } catch (err) {
        next(err);
    }
};

// GET /api/products/featured
export const getFeatured = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM products ORDER BY discount_price ASC LIMIT 5");
        const products = result.rows.map(mapProduct);
        res.json(products);
    } catch (err) { next(err); }
};

// GET /api/products/trending
export const getTrending = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM products ORDER BY created_at DESC LIMIT 5");
        const products = result.rows.map(mapProduct);
        res.json(products);
    } catch (err) { next(err); }
};

// GET /api/products/:id
export const getProductById = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM products WHERE id = $1", [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(mapProduct(result.rows[0]));
    } catch (err) { next(err); }
};

// POST /api/products (admin)
export const createProduct = async (req, res, next) => {
    try {
        const { name, category, brand, price, discount_price, stock, description, dosage_guide, size } = req.body;
        const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

        const result = await pool.query(
            `INSERT INTO products (name, category, brand, price, discount_price, stock, description, dosage_guide, image_url, size)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
            [name, category, brand, price, discount_price || price, stock || 0, description, dosage_guide, image_url, size]
        );
        res.status(201).json(mapProduct(result.rows[0]));
    } catch (err) { next(err); }
};

function mapProduct(p) {
    return {
        id: p.id,
        name: p.name,
        brand: p.brand,
        category: p.category,
        price: parseFloat(p.discount_price || p.price),
        originalPrice: parseFloat(p.price),
        discount: p.price > 0 ? Math.round(((p.price - (p.discount_price || p.price)) / p.price) * 100) : 0,
        rating: 4.4,
        reviewCount: Math.floor(Math.random() * 500) + 10,
        image: p.image_url,
        size: p.size || "—",
        stock: p.stock,
        description: p.description,
        dosage_guide: p.dosage_guide,
    };
}
