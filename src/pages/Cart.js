import { Box, Text, Flex } from "@stacks/ui";
import { useCart } from "../context/Cart";

import List from "../components/common/List";
import Button from "../components/common/Button";
import CartItem from "../components/shop/CartItem";

const Cart = () => {
  const [cart, , { loading }] = useCart();

  if (loading)
    return (
      <Text display="block" textAlign="center">
        Loading...
      </Text>
    );

  return (
    <Box px={["2rem", "3rem", "4rem"]} maxW="100rem" m="0 auto" mb="6rem">
      <List display="flex" flexDirection="column" style={{ gap: "3rem" }}>
        {cart.products &&
          cart.products.map((p) => (
            <CartItem
              key={p.id}
              id={p.id}
              title={p.title}
              quantity={p.quantity}
              price={p.price}
              imageUrl={p.imageUrl}
            />
          ))}
      </List>

      <Flex mt="2.5rem" justify="space-between" wrap="wrap" gap="1.5rem">
        <Text display="block" lineHeight={2} fontSize={["2rem", "2.5rem"]}>
          <Text fontWeight={600}>Total</Text>: STX {cart.totalAmount}
        </Text>

        <Button m="0">Complete Order</Button>
      </Flex>
    </Box>
  );
};

export default Cart;
