import { ReactNode } from "react";
import tw from "twin.macro";
import { usePrismTheme } from "./prism-theming";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import Card from "./card";

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div css={tw`p-3 uppercase tracking-wider bg-primary-400 font-bold`}>
      {children}
    </div>
  );
};

const ResultWithHeader = () => {
  return (
    <div>
      <Header>Result</Header>
      <div
        css={tw`p-4 text-[var(--lime-pre-color)] bg-[var(--lime-pre-bgcolor)]`}
      >
        <LivePreview />
        <LiveError css={tw`m-0! p-0! rounded-none!`} />
      </div>
    </div>
  );
};

const EditorWithHeader = () => {
  return (
    <div>
      <Header>Live Editor</Header>
      <LiveEditor css={tw`outline-none`} />
    </div>
  );
};

const Playground = ({ children }: { children: string }) => {
  const prismTheme = usePrismTheme();
  return (
    <Card rounded>
      <LiveProvider
        code={children.replace(/\n$/, "")}
        theme={prismTheme}
        noInline
      >
        <EditorWithHeader />
        <ResultWithHeader />
      </LiveProvider>
    </Card>
  );
};

export default Playground;
