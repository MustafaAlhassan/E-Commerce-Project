import express, { request, response } from "express";
import { register, login } from "../services/userService";

const router = express.Router();

router.post("/register", async (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  const result = await register({ firstName, lastName, email, password });
  response.status(result.statusCode).send(result.data);
});
router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const { data, statusCode } = await login({ email, password });
  response.status(statusCode).send(data);
});

export default router;
