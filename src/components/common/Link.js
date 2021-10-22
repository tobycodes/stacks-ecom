import styled from "styled-components";
import { layout, space, color, typography } from "styled-system";
import { Link } from "react-router-dom";

export default styled(Link)`
  display: inline-block;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  color: ${(props) => (props.active ? "#5546ff" : "inherit")};

  &.active {
    color: #5546ff;
  }

  &:hover {
    color: ${(props) => !props.noStyles && "#5546ff"};
    border-style: none;
    border-color: #000;
    box-shadow: ${(props) => !props.noStyles && "0 2px 0 0 #c5ccff"};
  }

  ${layout}
  ${space}
  ${color}
  ${typography}
`;
