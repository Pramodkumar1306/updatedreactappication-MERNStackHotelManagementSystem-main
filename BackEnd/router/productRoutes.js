 
import express from "express";
import { testDB, uploadFile, listProducts, deleteProduct } from "../controllers/productController.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get("/test-db", testDB);
router.post("/upload", upload.single("file"), uploadFile);

// NEW ROUTE
router.get("/products", listProducts);
router.delete("/product/:id", deleteProduct);

export default router;