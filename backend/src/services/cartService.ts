import { cartModel, ICart, ICartItem } from "../models/cartModel";
import { IOrderItem, orderModel } from "../models/orderModel";
import { productModel } from "../models/productModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
  populateProduct?: boolean; //Optional
}

export const getActiveCartForUser = async ({
  userId,
  populateProduct,
}: GetActiveCartForUser) => {
  let cart;
  if (populateProduct) {
    cart = await cartModel
      .findOne({ userId, status: "active" })
      .populate("items.product");
  } else {
    cart = await cartModel.findOne({ userId, status: "active" });
  }
  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};

interface ClearCart {
  userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
  try {
    const cart = await getActiveCartForUser({ userId });
    cart.items = [];
    cart.totalAmount = 0;
    const updatedCart = await cart.save();

    return { data: updatedCart, statusCode: 200 };
  } catch {
    return { data: "Something wrong in clear cart", statusCode: 500 };
  }
};

interface AddItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}
export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: AddItemToCart) => {
  try {
    const cart = await getActiveCartForUser({ userId });

    //Does the item exist in the cart ?
    const existsInCart = cart.items.find(
      (p) => p.product.toString() === productId
    );

    if (existsInCart) {
      return { data: "Item already exists in cart!", statusCode: 400 };
    }

    // Fetch the product
    const product = await productModel.findById(productId);

    if (!product) {
      return { data: "Product not found!", statusCode: 400 };
    }

    if (product.stock < quantity) {
      return { data: "Low stack for item", statusCode: 400 };
    }

    cart.items.push({ product: productId, unitPrice: product.price, quantity });

    //Update totalAmount of the cart
    cart.totalAmount += product.price * quantity;
    await cart.save();

    return { data: await getActiveCartForUser({ userId, populateProduct: true}), statusCode: 201 };
  } catch {
    return { data: "Something Wrong in Add Item", statusCode: 500 };
  }
};

interface UpdateItemInCart {
  productId: any;
  quantity: number;
  userId: string;
}
export const updateItemInCart = async ({
  productId,
  quantity,
  userId,
}: UpdateItemInCart) => {
  try {
    const cart = await getActiveCartForUser({ userId });

    const existsInCart = cart.items.find(
      (p) => p.product.toString() === productId
    );

    if (!existsInCart) {
      return { data: "Item does not exist in cart", statusCode: 400 };
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return { data: "Product not found!", statusCode: 400 };
    }
    if (product.stock < quantity) {
      return { data: "Low stack for item", statusCode: 400 };
    }

    const otherCartItems = cart.items.filter(
      (p) => p.product.toString() !== productId
    );

    let total = calculateCartTotalItems({ cartItems: otherCartItems });

    existsInCart.quantity = quantity;
    total += existsInCart.quantity * existsInCart.unitPrice;
    cart.totalAmount = total;
    await cart.save();

    return { data: await getActiveCartForUser({userId, populateProduct: true}), statusCode: 201 };
  } catch {
    return { data: "Something Wrong in Update Item", statusCode: 500 };
  }
};

interface DeleteItemInCart {
  productId: any;
  userId: string;
}
export const deleteItemInCart = async ({
  userId,
  productId,
}: DeleteItemInCart) => {
  try {
    const cart = await getActiveCartForUser({ userId });

    const existsInCart = cart.items.find(
      (p) => p.product.toString() === productId
    );
    if (!existsInCart) {
      return { data: "Item does not exist in cart", statusCode: 400 };
    }

    const otherCartItems = cart.items.filter(
      (p) => p.product.toString() !== productId
    );

    let total = calculateCartTotalItems({ cartItems: otherCartItems });

    cart.items = otherCartItems;
    cart.totalAmount = total;
    await cart.save();
    
    return { data: await getActiveCartForUser({userId, populateProduct: true}), statusCode: 201 };
  } catch {
    return { data: "Something Wrong in Delete Item", statusCode: 500 };
  }
};

const calculateCartTotalItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  let total = cartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);

  return total;
};

interface Checkout {
  userId: string;
  address: string;
}
export const checkout = async ({ userId, address }: Checkout) => {
  try {
    if (!address) {
      return { data: "Please add the address", statusCode: 400 };
    }

    const cart = await getActiveCartForUser({ userId });

    const orderItems: IOrderItem[] = [];

    // loop cartItems and create orderItems
    for (const item of cart.items) {
      const product = await productModel.findById(item.product);

      if (!product) {
        return { data: "Product not found", statusCode: 400 };
      }
      const orderItem: IOrderItem = {
        productTilte: product.title,
        productImage: product.image,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
      };
      orderItems.push(orderItem);
    }

    const order = await orderModel.create({
      orderItems,
      total: cart.totalAmount,
      address,
      userId,
    });

    await order.save();

    //update the cart status to be completed
    cart.status = "completed";
    await cart.save();

    return { data: order, statusCode: 200 };
  } catch {
    return { data: "Something Wrong when Checkout", statusCode: 500 };
  }
};
