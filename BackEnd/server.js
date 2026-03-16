import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./router/productRoutes.js";
import cartRoutes from "./router/cartRoutes.js";
import orderRoutes from "./router/orderRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});