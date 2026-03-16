import db from "../config/postgres.js";

export const addProduct = async (product) => {

  const { name, description, category, price, image_url } = product;

  const query = `
    INSERT INTO products(name, description, category, price, image_url)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *
  `;

  const values = [name, description, category, price, image_url];

  const result = await db.query(query, values);

  return result.rows[0];
};

export const getProducts = async () => {

  const result = await db.query(
    "SELECT * FROM products ORDER BY id DESC"
  );

  return result.rows;
};