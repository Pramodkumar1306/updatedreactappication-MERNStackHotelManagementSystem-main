import serviceBusClient from "../config/serviceBus.js";
import { getCart, upsertCart, deleteCart } from "../models/cartModel.js";

const receiver = serviceBusClient.createReceiver(process.env.CART_QUEUE_NAME);

const mergeItems = (existingItems = [], incomingItem) => {
  const existingIndex = existingItems.findIndex(
    (i) => String(i.productId) === String(incomingItem.productId)
  );

  if (existingIndex === -1) {
    return [...existingItems, { ...incomingItem, quantity: incomingItem.quantity ?? 1 }];
  }

  const updated = [...existingItems];
  updated[existingIndex] = {
    ...updated[existingIndex],
    quantity:
      (Number(updated[existingIndex].quantity) || 0) +
      (Number(incomingItem.quantity) || 1),
  };
  return updated;
};

const removeItem = (existingItems = [], productId) => {
  return existingItems.filter((i) => String(i.productId) !== String(productId));
};

receiver.subscribe({
  processMessage: async (message) => {
    const { action, userId, product, productId } = message.body;

    if (!userId) {
      console.warn("Cart message missing userId", message.body);
      return;
    }

    if (action === "ADD") {
      const existing = await getCart(userId);
      const cart = existing ?? { id: userId, userId, items: [] };
      cart.items = mergeItems(cart.items, product);
      await upsertCart(cart);
      console.log("Cart updated for user", userId);
    } else if (action === "REMOVE") {
      const existing = await getCart(userId);
      if (existing) {
        existing.items = removeItem(existing.items, productId);
        await upsertCart(existing);
        console.log("Item removed from cart for user", userId);
      }
    } else if (action === "CLEAR") {
      await deleteCart(userId);
      console.log("Cart cleared for user", userId);
    }
  },
  processError: async (err) => {
    console.error("Cart worker Service Bus error", err);
  },
});
