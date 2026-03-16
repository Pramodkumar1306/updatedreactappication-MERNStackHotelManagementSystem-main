import serviceBusClient from "../config/serviceBus.js";
import { addProduct } from "../models/productModel.js";

const receiver = serviceBusClient.createReceiver(
  process.env.QUEUE_NAME
);

receiver.subscribe({

  processMessage: async (message) => {

    const product = message.body;

    await addProduct(product);

    console.log("Product stored in DB:", product);

  },

  processError: async (err) => {
    console.log("Service Bus Error:", err);
  }

});