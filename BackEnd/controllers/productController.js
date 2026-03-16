import pool from "../config/postgres.js";
import blobServiceClient from "../config/storage.js";
import serviceBusClient from "../config/serviceBus.js";
import fs from "fs";
import { getProducts } from "../models/productModel.js";

export const testDB = async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "Database Connected",
      time: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadFile = async (req, res) => {
  try {

    const containerClient = blobServiceClient.getContainerClient(
      process.env.BLOB_CONTAINER
    );

    const blobName = Date.now() + "-" + req.file.originalname;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload image to Azure Blob Storage
    await blockBlobClient.uploadFile(req.file.path);

    // Delete local file
    fs.unlinkSync(req.file.path);

    const imageUrl = blockBlobClient.url;

    const { name, description, category, price } = req.body;

    // Send message to Service Bus
    const sender = serviceBusClient.createSender(process.env.QUEUE_NAME);

    await sender.sendMessages({
      body: {
        name,
        description,
        category,
        price,
        image_url: imageUrl
      }
    });

    await sender.close();

    res.json({
      message: "Image uploaded and product data sent to Service Bus queue",
      image_url: imageUrl
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


// LIST PRODUCTS (for Admin panel)
export const listProducts = async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE PRODUCT (Admin can delete)
export const deleteProduct = async (req, res) => {
  try {

    const { id } = req.params;

    await pool.query("DELETE FROM products WHERE id=$1", [id]);

    res.json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};