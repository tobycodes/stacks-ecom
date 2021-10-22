import { Box, Grid, Text } from "@stacks/ui";

import ProductCard from "./ProductCard";

const ProductList = ({ title, products }) => {
  return (
    <Box w="100%">
      <Box w="70%" m="0 auto">
        <Text
          marginBottom="2rem"
          fontSize="2.5rem"
          fontWeight="semibold"
          textTransform="capitalize"
        >
          {title}
        </Text>
      </Box>

      <Grid
        gap="4rem"
        templateColumns="repeat(auto-fit, minmax(25rem, 1fr))"
        w="70%"
        px="4rem"
        m="0 auto"
      >
        {products.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            imageUrl={p.image}
            category={p.category}
            price={p.price}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
