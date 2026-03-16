import { CosmosClient } from "@azure/cosmos";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const databaseId = process.env.COSMOS_DATABASE || "hotel-cart";
const containerId = process.env.COSMOS_CONTAINER || "cart";

let client;
let database;
let container;

if (endpoint && key) {
  client = new CosmosClient({ endpoint, key });
  database = client.database(databaseId);
  container = database.container(containerId);
} else {
  console.warn("Cosmos DB not configured. Cart persistence will be disabled. Set COSMOS_ENDPOINT and COSMOS_KEY in .env to enable.");
  // Provide dummy objects to avoid crashes
  client = null;
  database = null;
  container = null;
}

export default {
  client,
  database,
  container,
};
