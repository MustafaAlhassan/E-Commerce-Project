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
      {
        title: "Dell Laptop",
        image:
          "https://imgs.search.brave.com/pDglhMC-aKenZLWH7JoK1UpYRZI1_pX0OgutCX7dbMo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZWxs/c3RhdGljLmx1cm9j/b25uZWN0LmNvbS9t/ZWRpYS9jYXRhbG9n/L3Byb2R1Y3Qvby9k/L29kYjE0MjU1NTA3/MDFyaW51MS0yXzEu/anBn",
        price: 450000,
        stock: 7,
      },
      {
        title: "Asus Laptop",
        image:
          "https://imgs.search.brave.com/iwulsCiN3t6GFu4HVUGDVteXkwlpn9w967n4d08n0es/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vQVNV/Uy1WaXZvYm9vay1T/LTE1LTYtaW5jaC0z/Sy1PTEVELTEyMEh6/LVdpbmRvd3MtTGFw/dG9wLUludGVsLUNv/cmUtVWx0cmEtNy0x/NTVILUludGVsLUV2/by1FZGl0aW9uLUFJ/LVBDLTE2R0ItUkFN/LTFUQi1TU0QtTWlz/dC1CbHVlXzViNGIy/MWNjLTI1YjEtNDYw/YS04N2YxLTMxNjFk/YjU0ZDI5MC45ZDBm/NWQ1MWU2ODdhZjli/ZGFiODM5ODRmZDVh/NDg3NS5qcGVnP29k/bkhlaWdodD0zMjAm/b2RuV2lkdGg9MzIw/Jm9kbkJnPUZGRkZG/Rg",
        price: 750000,
        stock: 10,
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
