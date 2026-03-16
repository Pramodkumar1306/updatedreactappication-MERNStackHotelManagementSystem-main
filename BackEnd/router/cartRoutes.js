import express from "express";
import { addToCart, getCartForUser, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

// Add an item to the cart (writes to Service Bus queue)
router.post("/cart", addToCart);

// Remove an item from the cart (writes to Service Bus queue)
router.post("/cart/remove", removeFromCart);

// Read the user's cart (reads from Cosmos DB)
router.get("/cart/:userId", getCartForUser);

export default router;
