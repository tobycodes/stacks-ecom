import { Box, Flex, Text } from "@stacks/ui";
import Link from "../common/Link";
import Image from "../common/Image";
import Button from "../common/Button";
import { useCartActions } from "../../hooks/useCartActions";

const ProductCard = ({ id, title, imageUrl, category, price }) => {
  const { addToCart, loading } = useCartActions();

  return (
    <Box
      w="100%"
      shadow="0 1px 4px rgba(0,0,0,0.3)"
      borderRadius="0.8rem"
      overflow="hidden"
    >
      <Link to={`/product/${id}`} display="block" noStyles>
        <Flex
          h="28rem"
          margin="0 auto"
          mb="2rem"
          width="100%"
          justify="center"
          align="center"
          overflow="hidden"
          transition="all .4s ease"
          backgroundImage="linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0, 0.1))"
          className="prod-img-wrapper"
        >
          <Image
            src={imageUrl}
            alt={title}
            width="auto"
            height="80%"
            zIndex="-1"
            style={{ transition: "transform 3s ease" }}
          />
        </Flex>
      </Link>

      <Flex align="center" justify="space-between" padding="0 1.5rem 2rem">
        <Box overflow="hidden" w="100%" lineHeight={1.6}>
          <Text
            as="p"
            flex={1}
            display="block"
            w="90%"
            fontWeight={600}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={title}
          >
            {title}
          </Text>
          <Link to={`/category/${category}`} noStyles>
            <Text
              as="p"
              display="block"
              textTransform="capitalize"
              color="#5546ff"
            >
              {category}
            </Text>
          </Link>
          <Text
            as="p"
            display="block"
            fontWeight={600}
            textTransform="capitalize"
          >
            STX {price}
          </Text>
        </Box>
        <Button
          padding="0.8rem 1.2rem"
          height="auto"
          fontSize="1.2rem"
          fontWeight={600}
          margin="0"
          isLoading={loading}
          onClick={() => addToCart({ id, title, imageUrl, price, quantity: 1 })}
        >
          Buy Now
        </Button>
      </Flex>
    </Box>
  );
};

export default ProductCard;
