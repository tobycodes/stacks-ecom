import { Box } from "@stacks/ui";

import { getPerson } from "../../api/auth";

const Avatar = () => {
  const person = getPerson();

  if (person.avatarUrl()) {
    return (
      <Box
        borderRadius="50%"
        width="24px"
        height="24px"
        display="inline-block"
        overflow="hidden"
        mr={2}
        sx={{ position: "relative", top: "6px" }}
      >
        <Box
          as="img"
          src={person.avatarUrl()}
          maxWidth="100%"
          minHeight="24px"
          minWidth="24px"
        />
      </Box>
    );
  }
  return null;
};

export default Avatar;
