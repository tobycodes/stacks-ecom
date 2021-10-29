import { useState, useEffect } from "react";
import { Flex, Text } from "@stacks/ui";

import { ProductList } from "components/shop";
import productService from "api/productService";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
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
      gap="10px"
      align="center"
      direction="column"
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
