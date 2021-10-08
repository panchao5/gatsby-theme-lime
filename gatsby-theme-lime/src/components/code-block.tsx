import { useRef, useState } from "react";
import tw, { styled } from "twin.macro";
import Highlight, { Language, defaultProps } from "prism-react-renderer";
import rangeParser from "parse-numeric-range";
import { usePrismTheme } from "./prism-theming";
import { copyToClipboard } from "../utils";

const highlightLinesRangeRegex = /{([\d,-]+)}/;

function parseHighlightLinesRange(metastring: string) {
  const highLightLinesRange =
    metastring.match(highlightLinesRangeRegex)?.[1] ?? "";
  const highlightLines = rangeParser(highLightLinesRange);
  return highlightLines;
}

interface CodeBlockProps {
  children: string;
  className: string;
  metastring: string;
  [index: string]: string;
}

const Container = styled.div(
  tw`my-4 rounded-md shadow overflow-hidden --code-line-padding[1rem]`
);

const Header = styled.div(
  tw`px-4 py-2 text-gray-700 bg-primary-400 border-opacity-75 font-semibold`
);

const Content = styled.div(tw`relative`);

const CopyButton = styled.button(
  tw`absolute px-2 text-sm text-white bg-black bg-opacity-30 rounded-sm top-[calc(var(--code-line-padding) / 2)] right-[calc(var(--code-line-padding) / 2)]`
);

const CodeBlock = (props: CodeBlockProps) => {
  const {
    children = "",
    className: languageClassName,
    metastring = "",
    title,
  } = props;

  const prismTheme = usePrismTheme();

  const [showCopied, setShowCopied] = useState(false);

  const button = useRef(null);

  const content = Array.isArray(children) ? children.join("") : children;

  const highlightLines = parseHighlightLinesRange(metastring);

  const language = languageClassName?.replace(/language-/, "");

  const code = content.replace(/\n$/, "");

  const handleCopyCode = () => {
    copyToClipboard(code);
    setShowCopied(true);

    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language as Language}
      theme={prismTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Container>
          {title && <Header>{title}</Header>}
          <Content>
            <pre
              tabIndex={0}
              tw="m-0! px-0! rounded-none!"
              className={className}
              style={style}
            >
              <code tw="px-4! flex flex-col min-w-full float-left">
                {tokens.map((line, i) => {
                  if (line.length === 1 && line[0].content === "") {
                    line[0].content = "\n";
                  }

                  const lineProps = getLineProps({ line, key: i });

                  const isHighlight = highlightLines.includes(i + 1);

                  return (
                    <span
                      css={
                        isHighlight &&
                        tw`block bg-gray-400 bg-opacity-10 mx-[calc(-1 * var(--code-line-padding))] px-[var(--code-line-padding)]`
                      }
                      {...lineProps}
                    >
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </span>
                  );
                })}
              </code>
            </pre>
            <CopyButton ref={button} type="button" onClick={handleCopyCode}>
              {showCopied ? "已复制" : "复制"}
            </CopyButton>
          </Content>
        </Container>
      )}
    </Highlight>
  );
};

export default CodeBlock;
