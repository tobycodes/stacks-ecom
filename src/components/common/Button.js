import styled from "styled-components";
import { Button, Text } from "@stacks/ui";

import { baseStyleProps } from "../theme";

const StyledButton = styled(Button)`
  padding: 1rem 2rem;
  font-weight: 500;
  min-height: 4.2rem;
  min-width: 8.5rem;
  font-size: 1.7rem;
  letter-spacing: -0.01em;
  margin: 0 1rem;

  &:disabled {
    opacity: 0.7;
    pointer-events: none;
    cursor: not-allowed;
  }

  ${baseStyleProps}
`;

export default function MainButton({ children, isLoading, ...props }) {
  return (
    <StyledButton {...props}>
      {isLoading ? <Text fontSize="1.15rem">loading...</Text> : children}
    </StyledButton>
  );
}
