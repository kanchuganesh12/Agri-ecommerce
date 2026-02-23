import pool from "../config/db.js";

// GET /api/cart — get user's cart
export const getCart = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Get or create cart
        let cart = await pool.query("SELECT id FROM cart WHERE user_id = $1", [userId]);
        if (cart.rows.length === 0) {
            cart = await pool.query("INSERT INTO cart (user_id) VALUES ($1) RETURNING id", [userId]);
        }
        const cartId = cart.rows[0].id;

        // Get items with product info
        const items = await pool.query(
            `SELECT ci.id as cart_item_id, ci.quantity, p.id, p.name, p.brand, p.price as "originalPrice",
              p.discount_price as price, p.image_url as image, p.size, p.category
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.cart_id = $1`,
            [cartId]
        );

        res.json({ cartId, items: items.rows });
    } catch (err) { next(err); }
};

// POST /api/cart/add — add item
export const addToCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { product_id, quantity = 1 } = req.body;

        if (!product_id) return res.status(400).json({ message: "product_id is required" });

        // Get or create cart
        let cart = await pool.query("SELECT id FROM cart WHERE user_id = $1", [userId]);
        if (cart.rows.length === 0) {
            cart = await pool.query("INSERT INTO cart (user_id) VALUES ($1) RETURNING id", [userId]);
        }
        const cartId = cart.rows[0].id;

        // Check if item exists
        const existing = await pool.query(
            "SELECT id, quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2",
            [cartId, product_id]
        );

        if (existing.rows.length > 0) {
            await pool.query(
                "UPDATE cart_items SET quantity = quantity + $1 WHERE id = $2",
                [quantity, existing.rows[0].id]
            );
        } else {
            await pool.query(
                "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)",
                [cartId, product_id, quantity]
            );
        }

        res.json({ message: "Product added to cart" });
    } catch (err) { next(err); }
};

// PUT /api/cart/update/:itemId
export const updateCartItem = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        if (quantity < 1) return res.status(400).json({ message: "Quantity must be at least 1" });

        await pool.query("UPDATE cart_items SET quantity = $1 WHERE id = $2", [quantity, req.params.itemId]);
        res.json({ message: "Cart updated" });
    } catch (err) { next(err); }
};

// DELETE /api/cart/remove/:itemId
export const removeFromCart = async (req, res, next) => {
    try {
        await pool.query("DELETE FROM cart_items WHERE id = $1", [req.params.itemId]);
        res.json({ message: "Item removed from cart" });
    } catch (err) { next(err); }
};

// DELETE /api/cart/clear
export const clearCart = async (req, res, next) => {
    try {
        const cart = await pool.query("SELECT id FROM cart WHERE user_id = $1", [req.user.id]);
        if (cart.rows.length > 0) {
            await pool.query("DELETE FROM cart_items WHERE cart_id = $1", [cart.rows[0].id]);
        }
        res.json({ message: "Cart cleared" });
    } catch (err) { next(err); }
};
