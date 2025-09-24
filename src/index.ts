import express from "express";
import mongoose from "mongoose";
import { seedInitialProducts } from "./services/productService";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";

const app = express();
const port = 3001;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("connected!!"))
  .catch((err) => console.log("No connection", err));

seedInitialProducts();

app.use("/user", userRoute);
app.use("/product", productRoute)

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
