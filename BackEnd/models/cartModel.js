import cosmos from "../config/cosmos.js";

const container = cosmos.container;

export const getCart = async (userId) => {
  if (!container) {
    console.warn("Cosmos DB not configured. Returning empty cart.");
    return null;
  }
  try {
    const { resource } = await container.item(userId, userId).read();
    return resource;
  } catch (err) {
    // Cosmos throws for missing documents; return null so callers can treat as empty cart
    if (err.code === 404) return null;
    throw err;
  }
};

export const upsertCart = async (cartDocument) => {
  if (!container) {
    console.warn("Cosmos DB not configured. Cart not persisted.");
    return null;
  }
  // cartDocument should include at least { id, userId, items: [] }
  const now = new Date().toISOString();
  const payload = {
    ...cartDocument,
    updatedAt: now,
    createdAt: cartDocument.createdAt ?? now,
  };

  const { resource } = await container.items.upsert(payload);
  return resource;
};

export const deleteCart = async (userId) => {
  if (!container) {
    console.warn("Cosmos DB not configured. Cart not deleted.");
    return;
  }
  await container.item(userId, userId).delete();
};
