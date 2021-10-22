import { v4 as uuid } from "uuid";
import { userSession } from "./auth";
import { Storage } from "@stacks/storage";

import { getCartTotal } from "../utils/getCartTotal";

const storage = new Storage({ userSession });
const CART_FILENAME = "cart.json";
const ORDERS_FILENAME = "all_carts.json";

export const baseCart = {
  products: [],
  totalItems: 0,
  totalAmount: 0,
  paid: false,
};

export const baseOrders = [];

// Seeder, basically
export const setDefaultCart = async () => {
  await storage.putFile(CART_FILENAME, JSON.stringify(baseCart), {
    dangerouslyIgnoreEtag: true,
  });

  return baseCart;
};

// ADD TO CART FLOW
// i. If it's an empty cart or the incoming product does not exist in the cart, we stick our new product in it
// ii. If it's not empty and our incoming product is in it, we simply update it and stick it into a filtered cart
// iii. If our cart does not exist, we create a new cart, add the product into it and save it
export const addToCart = async (product) => {
  try {
    let cart = await fetchCart();

    if (cart) {
      const existing = cart.products.find((p) => p.id === product.id);

      if (cart.products.length === 0 || !existing) {
        cart.products = [product, ...cart.products];
      } else {
        const filtered = cart.products.filter((p) => p.id !== product.id);
        const updated = {
          ...existing,
          quantity: existing.quantity + product.quantity,
        };

        cart.products = [updated].concat(filtered);
      }

      cart.totalItems = cart.products.length;
      cart.totalAmount = getCartTotal(cart.products);
    } else {
      cart = {
        products: [product],
        totalItems: 1,
        totalAmount: product.price * product.quantity,
        paid: false,
        id: uuid(),
      };
    }

    await storage.putFile(CART_FILENAME, JSON.stringify(cart), {
      dangerouslyIgnoreEtag: true,
    });

    return cart;
  } catch (err) {
    console.error(err);

    return null;
  }
};

export const removeFromCart = async (productId) => {
  try {
    const cart = await fetchCart();

    if (cart) {
      const product = cart.products.find((p) => p.id === productId);
      const updatedList = cart.products.filter((p) => p.id !== productId);
      const newTotal = cart.totalItems - 1;
      const newAmount = cart.totalAmount - product.price * product.quantity;

      const newCart = {
        products: updatedList,
        totalItems: newTotal >= 0 ? newTotal : 0,
        totalAmount: newAmount >= 0 ? newAmount : 0,
      };

      await storage.putFile(CART_FILENAME, JSON.stringify(newCart), {
        dangerouslyIgnoreEtag: true,
      });

      return newCart;
    }

    return cart;
  } catch (err) {
    console.error(err);

    return null;
  }
};

// Retrive cart from Gaia storage
export const fetchCart = async () => {
  try {
    const cartJSON = await storage.getFile(CART_FILENAME);

    return JSON.parse(cartJSON);
  } catch (error) {
    return null;
  }
};

// Retrive orders from Gaia storage
export const fetchOrders = async () => {
  try {
    const ordersJSON = await storage.getFile(ORDERS_FILENAME);

    return JSON.parse(ordersJSON);
  } catch (error) {
    return baseOrders;
  }
};

export const createOrder = async (cart) => {
  const ordersJSON = await fetchOrders();
  const newOrders =
    ordersJSON && Array.isArray(JSON.parse(ordersJSON))
      ? [cart, ...JSON.parse(ordersJSON)]
      : [cart];

  await storage.putFile(ORDERS_FILENAME, JSON.stringify(newOrders));

  return newOrders;
};

export const getOrder = async (orderId) => {
  const orders = await fetchOrders();

  return orders.find((o) => o.id === orderId);
};
