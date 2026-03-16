import serviceBusClient from "../config/serviceBus.js";
import { getCart } from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, product } = req.body;

    if (!userId || !product) {
      return res.status(400).json({ error: "userId and product are required" });
    }

    const sender = serviceBusClient.createSender(process.env.CART_QUEUE_NAME);

    await sender.sendMessages({
      body: {
        action: "ADD",
        userId,
        product,
      },
    });

    await sender.close();

    res.json({ message: "Cart update queued" });
  } catch (error) {
    console.error("addToCart error", error);
    res.status(500).json({ error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ error: "userId and productId are required" });
    }

    const sender = serviceBusClient.createSender(process.env.CART_QUEUE_NAME);

    await sender.sendMessages({
      body: {
        action: "REMOVE",
        userId,
        productId,
      },
    });

    await sender.close();

    res.json({ message: "Cart remove queued" });
  } catch (error) {
    console.error("removeFromCart error", error);
    res.status(500).json({ error: error.message });
  }
};

export const getCartForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const cart = await getCart(userId);

    res.json({ cart: cart ?? { id: userId, userId, items: [] } });
  } catch (error) {
    console.error("getCartForUser error", error);
    res.status(500).json({ error: error.message });
  }
};
