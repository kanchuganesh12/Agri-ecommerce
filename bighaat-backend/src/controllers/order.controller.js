import pool from "../config/db.js";

// POST /api/orders/place
export const placeOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { address, city, state, pincode, phone, paymentMethod } = req.body;

        // Get cart
        const cart = await pool.query("SELECT id FROM cart WHERE user_id = $1", [userId]);
        if (cart.rows.length === 0) return res.status(400).json({ message: "Cart is empty" });
        const cartId = cart.rows[0].id;

        // Get cart items
        const cartItems = await pool.query(
            `SELECT ci.product_id, ci.quantity, p.discount_price as price, p.name
       FROM cart_items ci JOIN products p ON p.id = ci.product_id WHERE ci.cart_id = $1`,
            [cartId]
        );
        if (cartItems.rows.length === 0) return res.status(400).json({ message: "Cart is empty" });

        // Calculate total
        const totalAmount = cartItems.rows.reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0);

        // Create order
        const order = await pool.query(
            `INSERT INTO orders (user_id, total_amount, payment_method, payment_status, order_status, address, city, state, pincode, phone)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
            [userId, totalAmount, paymentMethod || "cod", "pending", "processing", address, city, state, pincode, phone]
        );
        const orderId = order.rows[0].id;

        // Move cart items to order items
        for (const item of cartItems.rows) {
            await pool.query(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1,$2,$3,$4)",
                [orderId, item.product_id, item.quantity, item.price]
            );
            // Decrease stock
            await pool.query("UPDATE products SET stock = stock - $1 WHERE id = $2", [item.quantity, item.product_id]);
        }

        // Clear cart
        await pool.query("DELETE FROM cart_items WHERE cart_id = $1", [cartId]);

        res.status(201).json({
            id: `BH${orderId}`,
            date: order.rows[0].created_at,
            status: "Processing",
            total: totalAmount,
            items: cartItems.rows.map((i) => ({ name: i.name, qty: i.quantity, price: parseFloat(i.price) })),
        });
    } catch (err) { next(err); }
};

// GET /api/orders
export const getOrders = async (req, res, next) => {
    try {
        const orders = await pool.query(
            `SELECT o.*, json_agg(json_build_object('name', p.name, 'qty', oi.quantity, 'price', oi.price)) as items
       FROM orders o
       LEFT JOIN order_items oi ON oi.order_id = o.id
       LEFT JOIN products p ON p.id = oi.product_id
       WHERE o.user_id = $1
       GROUP BY o.id ORDER BY o.created_at DESC`,
            [req.user.id]
        );

        const mapped = orders.rows.map((o) => ({
            id: `BH${o.id}`,
            date: o.created_at?.toISOString().split("T")[0],
            status: o.order_status.charAt(0).toUpperCase() + o.order_status.slice(1),
            total: parseFloat(o.total_amount),
            items: o.items?.filter((i) => i.name) || [],
        }));

        res.json(mapped);
    } catch (err) { next(err); }
};

// GET /api/orders/:id
export const getOrderById = async (req, res, next) => {
    try {
        const orderId = req.params.id.replace("BH", "");
        const order = await pool.query("SELECT * FROM orders WHERE id = $1 AND user_id = $2", [orderId, req.user.id]);
        if (order.rows.length === 0) return res.status(404).json({ message: "Order not found" });

        const items = await pool.query(
            `SELECT oi.*, p.name, p.image_url FROM order_items oi JOIN products p ON p.id = oi.product_id WHERE oi.order_id = $1`,
            [orderId]
        );

        res.json({
            ...order.rows[0],
            id: `BH${order.rows[0].id}`,
            items: items.rows,
        });
    } catch (err) { next(err); }
};
