import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useCart } from "hooks";
import { addToCart, removeFromCart } from "api/storage";
import { userSession, authenticate } from "api/auth";

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

  const doRemoveFromCart = useCallback(
    async (productId) => {
      setLoading(true);

      try {
        const result = await removeFromCart(productId);

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
        authenticate({ onFinish: () => doAddToCart(productData) });
      } else {
        doAddToCart(productData);
      }
    },
    [doAddToCart]
  );

  const handleRemoveFromCart = useCallback(
    (productId) => {
      if (!userSession.isUserSignedIn()) {
        authenticate({ onFinish: () => doRemoveFromCart(productId) });
      } else {
        doRemoveFromCart(productId);
      }
    },
    [doRemoveFromCart]
  );

  return {
    loading,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
  };
};
