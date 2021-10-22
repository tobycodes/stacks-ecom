import { Text } from "@stacks/ui";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <Text
        fontSize="30px"
        mb="3rem"
        textAlign="center"
        display="block"
        fontWeight={600}
      >
        Welcome to Stacks eCom
      </Text>
      {children}
    </div>
  );
};

export default Layout;
