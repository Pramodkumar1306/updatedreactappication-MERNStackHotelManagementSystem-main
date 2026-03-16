import pool from "../config/postgres.js";

export const createOrder = async ({ userId, items, totalAmount, status = "PENDING" }) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const orderResult = await client.query(
      `INSERT INTO orders (user_id, status, total_amount)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, status, totalAmount]
    );

    const orderId = orderResult.rows[0].id;

    const insertItemText = `
      INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    for (const item of items) {
      await client.query(insertItemText, [
        orderId,
        item.productId,
        item.name,
        item.price,
        item.quantity ?? 1,
        item.image_url || item.imageUrl || null,
      ]);
    }

    await client.query("COMMIT");

    return orderResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const listOrders = async () => {
  const result = await pool.query(
    `SELECT o.*, json_agg(json_build_object(
        'id', oi.id,
        'productId', oi.product_id,
        'productName', oi.product_name,
        'unitPrice', oi.unit_price,
        'quantity', oi.quantity,
        'imageUrl', oi.image_url
      )) AS items
     FROM orders o
     LEFT JOIN order_items oi ON oi.order_id = o.id
     GROUP BY o.id
     ORDER BY o.created_at DESC`
  );
  return result.rows;
};

export const updateOrderStatus = async (orderId, status) => {
  const result = await pool.query(
    `UPDATE orders
     SET status = $1,
         updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [status, orderId]
  );
  return result.rows[0];
};
