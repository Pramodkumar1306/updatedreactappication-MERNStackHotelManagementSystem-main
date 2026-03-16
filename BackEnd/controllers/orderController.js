import { createOrder, listOrders, updateOrderStatus } from "../models/orderModel.js";
import { getCart, deleteCart } from "../models/cartModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const cart = await getCart(userId);
    if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce((sum, item) => {
      const price = Number(item.price ?? item.unitPrice ?? 0);
      const qty = Number(item.quantity ?? 1);
      return sum + price * qty;
    }, 0);

    const order = await createOrder({
      userId,
      items: cart.items,
      totalAmount,
    });

    // Remove cart document after order creation
    await deleteCart(userId);

    res.json({ order });
  } catch (error) {
    console.error("placeOrder error", error);
    res.status(500).json({ error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await listOrders();
    res.json({ orders });
  } catch (error) {
    console.error("getOrders error", error);
    res.status(500).json({ error: error.message });
  }
};

export const setOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: "orderId is required" });
    }
    if (!status) {
      return res.status(400).json({ error: "status is required" });
    }

    const updated = await updateOrderStatus(orderId, status);
    res.json({ order: updated });
  } catch (error) {
    console.error("setOrderStatus error", error);
    res.status(500).json({ error: error.message });
  }
};
