import express, { response } from "express";
import {
  addItemToCart,
  checkout,
  clearCart,
  deleteItemInCart,
  getActiveCartForUser,
  updateItemInCart,
} from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router();

router.get("/", validateJWT, async (req, res) => {
  try {
    const userId = req?.user?._id;
    const cart = await getActiveCartForUser({ userId: userId, populateProduct: true });
    res.status(200).send(cart);
  } catch {
    res.status(500).send("Something Went Wrong!");
  }
});

router.delete("/", validateJWT, async (req, res) => {
  try {
    const userId = req?.user?._id;
    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Something Went Wrong!");
  }
});

router.post("/items", validateJWT, async (req, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Something Went Wrong!");
  }
});

router.put("/items", validateJWT, async (req, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await updateItemInCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Something Went Wrong!");
  }
});

router.delete("/items/:productId", validateJWT, async (req, res) => {
  try {
    const userId = req?.user?._id;
    const { productId } = req.params;
    const response = await deleteItemInCart({ userId, productId });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Something Went Wrong!");
  }
});

router.post("/checkout", validateJWT, async (req, res) => {
  try {
    const userId = req?.user?._id;
    const { address } = req.body;
    const response = await checkout({ userId, address });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Something Went Wrong!");
  }
});

export default router;
