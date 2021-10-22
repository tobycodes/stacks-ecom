import { useState, useEffect } from "react";
import { Flex, Text } from "@stacks/ui";
import { useRouteMatch } from "react-router-dom";

import { ProductList } from "components/shop";
import productService from "api/productService";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const match = useRouteMatch();
  const { name } = match.params;

  useEffect(() => {
    const getProducts = async () => {
      const products = await productService.productsByCategory({ name });

      setProducts(products.sort(() => Math.random() - Math.random()));
      setLoading(false);
    };

    getProducts();
  }, [name]);

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      gap="10px"
      mb="5rem"
    >
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ProductList title={name} products={products} />
      )}
    </Flex>
  );
};

export default Category;
