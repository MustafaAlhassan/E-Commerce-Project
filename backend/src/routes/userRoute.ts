import express, { request, response } from "express";
import { register, login } from "../services/userService";

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

export default router;
