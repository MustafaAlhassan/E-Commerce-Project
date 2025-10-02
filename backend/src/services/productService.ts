import { productModel } from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Lenovo Laptop",
        image:
          "https://imgs.search.brave.com/VGN2C3eigWVo64LWYrUDtHWWm3_x9CoCTp_bkiuf4T0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0L1dR/Vzg1cEJKWXFOS2JO/WmRWdnZISk0ucG5n",
        price: 500000,
        stock: 15,
      },
    ];
    const existingProducts = await getAllProducts();
    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.error("Cannot see database", err);
  }
};
