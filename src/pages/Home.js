import { useState, useEffect } from "react";
import { Flex, Text } from "@stacks/ui";

import { ProductList } from "components/shop";
import productService from "api/productService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const products = await productService.products();

      const randomProducts = products
        .sort(() => Math.random() - Math.random())
        .slice(0, 9);

      setProducts(randomProducts);
      setLoading(false);
    };

    getProducts();
  }, []);

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
        <ProductList title="Top Selling Products" products={products} />
      )}
    </Flex>
  );
};

export default Home;
