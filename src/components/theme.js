import {
  layout,
  space,
  color,
  flexbox,
  grid,
  background,
  border,
  position,
  typography,
  compose,
} from "styled-system";

export const baseStyleProps = compose(
  layout,
  space,
  color,
  flexbox,
  grid,
  background,
  border,
  position,
  typography
);
