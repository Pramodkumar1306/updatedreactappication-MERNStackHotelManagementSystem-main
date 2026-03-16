import express from "express";
import { placeOrder, getOrders, setOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

// Place an order (moves cart from Cosmos into Postgres orders)
router.post("/order", placeOrder);

// Admin: list all orders
router.get("/orders", getOrders);

// Admin: update order status (approve/reject)
router.patch("/orders/:orderId/status", setOrderStatus);

export default router;
