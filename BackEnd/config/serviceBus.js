import { ServiceBusClient } from "@azure/service-bus";
import dotenv from "dotenv";

dotenv.config();

const serviceBusClient = new ServiceBusClient(
  process.env.SERVICE_BUS_CONNECTION_STRING
);

export default serviceBusClient;