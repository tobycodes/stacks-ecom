import { useMemo } from "react";
import { Flex, Text } from "@stacks/ui";

import { ProductList } from "components/shop";
import { useProducts } from "hooks";

const AllProducts = () => {
  const {data, isLoading} = useProducts()

  const randomProducts = useMemo(() => {
    const products = data || [];

    return products.sort(() => Math.random() - Math.random())
  }, [data])

  return (
    <Flex
      justify="center"
      gap="10px"
      align="center"
      direction="column"
      mb="5rem"
    >
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <ProductList title="All Products" products={randomProducts} />
      )}
    </Flex>
  );
};

export default AllProducts;
