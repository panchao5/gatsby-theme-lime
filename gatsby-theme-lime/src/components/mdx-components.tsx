import { isValidElement } from "react";
import { Link } from "gatsby";
import tw, { styled } from "twin.macro";
import CodeBlock from "./code-block";
import Playground from "./playground";

const isBlockCodeString = (str: any): str is string => {
  return typeof str === "string" && str.includes("\n");
};

const StyledLink = styled(Link)(tw`styled-underline no-underline!`);

const components = {
  pre: (props: any) => {
    const { children } = props;
    if (
      isValidElement(children) &&
      // @ts-ignore
      children.props?.mdxType === "code" &&
      // @ts-ignore
      isBlockCodeString(children.props?.children)
    ) {
      return children;
    }
    return <pre {...props} />;
  },
  code: (props: any) => {
    const { children } = props;

    if (isBlockCodeString(children)) {
      if (props.live) {
        return <Playground {...props} />;
      }
      return <CodeBlock {...props} />;
    }

    return <code {...props} />;
  },
  a: (props: any) => {
    return <a css={tw`styled-underline no-underline!`} {...props} />;
  },
  Link: StyledLink,
};

export default components;
