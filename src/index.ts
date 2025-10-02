import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { seedInitialProducts } from "./services/productService";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";

dotenv.config()

const app = express();
const port = 3001;

app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("connected!!"))
  .catch((err) => console.log("No connection", err));

seedInitialProducts();

app.use("/user", userRoute);
app.use("/product", productRoute)
app.use("/cart", cartRoute)

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
