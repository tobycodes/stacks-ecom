import { Box, Flex, Text, CloseIcon } from "@stacks/ui";

import { Button, Image, Link, ListItem } from "components/common";
import { useCartActions } from "hooks";

const CartItem = ({ title, quantity, price, imageUrl, id }) => {
  const { loading, removeFromCart } = useCartActions();

  return (
    <ListItem
      display="flex"
      alignItems="center"
      style={{}}
      columnGap={["1.2rem", "2rem", "3rem"]}
      padding="1rem 0"
      borderTop="1px solid"
      borderBottom="1px solid"
    >
      <Link to={`/product/${id}`} noStyles>
        <Flex
          justify="center"
          align="center"
          overflow="hidden"
          w={["8rem", "12rem", "15rem", "20rem"]}
          h={["8rem", "12rem", "15rem", "20rem"]}
          backgroundImage="linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0, 0.1))"
          mr="1rem"
        >
          <Image
            src={imageUrl}
            width="auto"
            height="85%"
            maxWidth="33rem"
            zIndex={-1}
          />
        </Flex>
      </Link>
      <Box flex="1" fontSize={["1.2rem", "1.25rem", "1.4rem", "1.6rem"]}>
        <Text display="block" mb="1rem">
          <Text fontWeight={600}>Name</Text>: {title}
        </Text>
        <Text display="block" mb="1rem">
          <Text fontWeight={600}>Quantity</Text>: {quantity}
        </Text>
        <Text display="block" mb="1rem">
          <Text fontWeight={600}>Price</Text>: STX {price}
        </Text>
      </Box>
      <Button
        padding="0.5rem"
        width="max-content"
        minWidth="max-content"
        backgroundColor="transparent"
        _hover={{ backgroundColor: "transparent" }}
        disabled={loading}
        onClick={() => removeFromCart(id)}
      >
        <CloseIcon
          height={["1.2rem", "2rem", "3rem"]}
          width={["1.2rem", "2rem", "3rem"]}
          color="red"
        />
      </Button>
    </ListItem>
  );
};

export default CartItem;
