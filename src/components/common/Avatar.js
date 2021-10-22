import { Box } from "@stacks/ui";

import { getPerson } from "api/auth";

const Avatar = () => {
  const person = getPerson();

  if (person.avatarUrl()) {
    return (
      <Box
        borderRadius="50%"
        width="2.4rem"
        height="2.4rem"
        display="inline-block"
        overflow="hidden"
        mr={2}
        sx={{ position: "relative", top: "0.6rem" }}
      >
        <Box
          as="img"
          src={person.avatarUrl()}
          maxWidth="100%"
          minHeight="2.4rem"
          minWidth="2.4rem"
        />
      </Box>
    );
  }
  return null;
};

export default Avatar;
