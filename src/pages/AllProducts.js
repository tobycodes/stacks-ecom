import { useState, useEffect } from "react";
import { Flex, Text } from "@stacks/ui";

import ProductList from "../components/shop/ProductList";

import productService from "../api/productService";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const products = await productService.products();

      setProducts(products.sort(() => Math.random() - Math.random()));
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
        <ProductList title="All Products" products={products} />
      )}
    </Flex>
  );
};

export default AllProducts;
