import { useState, useEffect } from "react";
import { Box, Flex, Text, Input } from "@stacks/ui";
import { useRouteMatch } from "react-router-dom";

import { Button, Image } from "components/common";
import { useCartActions } from "hooks";
import productService from "api/productService";

const Product = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, loading } = useCartActions();
  const match = useRouteMatch();
  const { id } = match.params;

  const handleAddToCart = () => {
    const { id, title, price, image } = product;

    addToCart({ id, title, price, imageUrl: image, quantity });
  };

  useEffect(() => {
    const getProduct = async () => {
      const product = await productService.getProduct(id);

      setProduct(product);
      setIsLoading(false);
    };

    getProduct();
  }, [id]);

  if (isLoading)
    return (
      <Text display="block" textAlign="center">
        Loading...
      </Text>
    );

  return (
    <Box w="100%" mb="5rem">
      <Flex
        direction={["column", "row"]}
        align={["flex-start", "center"]}
        w={["100%", "100%", "85%"]}
        m="0 auto"
        mb="2rem"
      >
        <Flex
          justify="center"
          align="center"
          overflow="hidden"
          w="100%"
          h="40rem"
          backgroundImage="linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0, 0.1))"
          mr={[0, "1.5rem", "3rem"]}
        >
          <Image
            src={product.image}
            width="auto"
            height="85%"
            maxWidth="33rem"
            zIndex={-1}
          />
        </Flex>
        <Box p="3rem" minW="42%">
          <Text
            fontWeight={600}
            mb="1.2rem"
            fontSize={["1.6rem", "2rem", "2.5rem"]}
          >
            {product.title}
          </Text>
          <Text
            as="p"
            mb="2rem"
            display="block"
            textTransform="capitalize"
            color="#5546ff"
          >
            {product.category}
          </Text>
          <Text
            as="p"
            mb="4rem"
            display="block"
            fontWeight={600}
            fontSize={["1.6rem", "2rem", "2.5rem"]}
          >
            STX {product.price}
          </Text>
          <Input
            height="2rem"
            borderColor="#5546ff"
            _hover={{ borderColor: "#5546ff" }}
            width="5rem"
            padding="0.75rem"
            mb="1.2rem"
            variant="outline"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
          />
          <Button
            margin="0"
            fontSize="2rem"
            padding="1.2rem 1.5rem"
            borderRadius="1rem"
            minW="15rem"
            isLoading={loading}
            disabled={loading}
            onClick={handleAddToCart}
          >
            Buy Now
          </Button>
        </Box>
      </Flex>

      <Box p="3rem" maxW="75rem" m="0 auto" fontSize="1.7rem">
        <Text textAlign="justify" mb="1.5rem">
          <Text fontWeight={600}>Description:</Text> {product.description}
        </Text>

        <Text textAlign="justify">
          <Text fontWeight={600}>Rating:</Text> {product.rating.rate} (
          {product.rating.count} votes)
        </Text>
      </Box>
    </Box>
  );
};

export default Product;
