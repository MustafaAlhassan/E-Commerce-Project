import express, { request, response } from "express";
import { register, login, getMyOrders } from "../services/userService";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    const result = await register({ firstName, lastName, email, password });
    response.status(result.statusCode).json(result.data);
  } catch {
    response.status(500).send("Somthing Went Wrong!");
  }
});
router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const { data, statusCode } = await login({ email, password });
    response.status(statusCode).json(data);
  } catch {
    response.status(500).send("Somthing Went Wrong!");
  }
});

router.get("/my-orders", validateJWT, async (request, response) => {
  try {
    const userId = request?.user?._id;
    const { data, statusCode } = await getMyOrders({ userId });
    response.status(statusCode).send(data);
  } catch {
    response.status(500).send("Something Went Wrong!");
  }
});

export default router;
