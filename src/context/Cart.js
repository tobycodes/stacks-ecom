import { useState, useEffect, createContext, useContext } from "react";
import { baseCart, fetchCart } from "api/storage";

const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(baseCart);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doFetchCart = async () => {
      setLoading(true);
      const cart = await fetchCart();

      if (cart) {
        setCart(cart);
      }

      setLoading(false);
    };

    doFetchCart();
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart, { loading }]}>
      {children}
    </CartContext.Provider>
  );
};

export const CartConsumer = CartContext.Consumer;

export const useCart = () => {
  const data = useContext(CartContext);

  return data;
};
