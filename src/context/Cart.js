import { useState, useEffect, createContext, useContext } from "react";
import { baseCart, fetchCart } from "../api/storage";

const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(baseCart);

  useEffect(() => {
    const doFetchCart = async () => {
      const cart = await fetchCart();

      if (cart) {
        setCart(cart);
      }
    };

    doFetchCart();
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export const CartConsumer = CartContext.Consumer;

export const useCart = () => {
  const data = useContext(CartContext);

  // console.log()

  return data;
};
