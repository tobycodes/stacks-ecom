import { useMemo } from 'react';
import { Flex, Text } from "@stacks/ui";

import { ProductList } from "components/shop";
import { useProducts } from "hooks";


const Home = () => {
  const {data, isLoading} = useProducts()

  const randomProducts = useMemo(() => {
    const products = data || [];

    return products.sort(() => Math.random() - Math.random())
  }, [data])

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      gap="10px"
      mb="5rem"
    >
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <ProductList title="Top Selling Products" products={randomProducts.slice(0, 9)} />
      )}
    </Flex>
  );
};

export default Home;
