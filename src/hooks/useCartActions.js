import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useCart } from "../context/Cart";

import { addToCart } from "../api/storage";
import { userSession, authenticate } from "../api/auth";

export const useCartActions = () => {
  const [loading, setLoading] = useState(false);
  const [, setCart] = useCart();
  const history = useHistory();

  const doAddToCart = useCallback(
    async (productData) => {
      setLoading(true);

      try {
        const result = await addToCart(productData);

        if (result) {
          setCart(result);
          history.push("/cart");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [history, setCart]
  );

  const handleAddToCart = useCallback(
    (productData) => {
      if (!userSession.isUserSignedIn()) {
        authenticate({ onFinish: doAddToCart });
      } else {
        doAddToCart(productData);
      }
    },
    [doAddToCart]
  );

  return { loading, addToCart: handleAddToCart };
};
