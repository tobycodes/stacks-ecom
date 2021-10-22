import { useState } from "react";
import { Flex, StacksLogo, Box, Text } from "@stacks/ui";
import { NavLink } from "react-router-dom";

import { Avatar, Button, Link, List, ListItem } from "components/common";
import { useCart } from "hooks";
import { userSession, getUserData, authenticate } from "api/auth";

const NavBar = () => {
  const [loading, setLoading] = useState(userSession.isSignInPending());
  const [cart] = useCart();

  const handleSignIn = async () => {
    setLoading(true);

    authenticate({
      onFinish: () => {
        setLoading(false);

        window.location.reload();
      },
    });
  };

  const handleSignOut = async () => {
    setLoading(true);

    userSession.signUserOut();
    window.location = "/";

    setLoading(false);
  };

  return (
    <Flex
      px={["2rem", "3rem", "4rem"]}
      py="1.5rem"
      mb="3.5rem"
      justify="space-between"
      align="center"
    >
      <Link to="/" noStyles>
        <StacksLogo height="5rem" width="10rem" color="black" />
      </Link>

      <List display="flex" alignItems="center" gridColumnGap="2rem">
        <List
          display="flex"
          alignItems="center"
          gridColumnGap="2rem"
          flex={1}
          justifyContent="center"
          mr="2rem"
        >
          <ListItem>
            <Link as={NavLink} to="/all-products">
              All Products
            </Link>
          </ListItem>
          {userSession.isUserSignedIn() && (
            <ListItem>
              <Link to="/cart" as={NavLink}>
                Your Cart ({cart.totalItems})
              </Link>
            </ListItem>
          )}
        </List>

        {userSession.isUserSignedIn() ? (
          <Box>
            <Avatar />
            <Text fontWeight="500">{getUserData().username}</Text>
            <Button
              isLoading={loading}
              disabled={loading}
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </Box>
        ) : (
          <>
            <ListItem>
              <Button
                isLoading={loading}
                disabled={loading}
                onClick={handleSignIn}
              >
                Login
              </Button>
            </ListItem>
            <ListItem>
              <Link to="/register" active>
                Register
              </Link>
            </ListItem>
          </>
        )}
      </List>
    </Flex>
  );
};

export default NavBar;
