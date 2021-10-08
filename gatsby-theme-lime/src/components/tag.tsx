import tw, { styled, TwStyle } from "twin.macro";

type Variant = "filled" | "outline";

interface TagProps {
  className?: string;
  tag: string;
  count?: number;
  variant?: Variant;
}

const rootStyles: Record<Variant, TwStyle> = {
  filled: tw`text-white bg-gray-500 bg-opacity-70`,
  outline: tw`text-current border-gray-500 border`,
};

const TagRoot = styled.span<{ variant: Variant }>(
  tw`inline-block px-2.5 py-0.5 rounded-full text-sm`,
  ({ variant }) => rootStyles[variant]
);

const TagCount = styled.span(
  tw`inline-block ml-2 bg-primary-400 rounded-full w-4 h-4 text-xs text-white text-center leading-4`
);

const Tag = (props: TagProps) => {
  const { className, tag, count, variant = "filled" } = props;
  const showCount = typeof count !== "boolean" && !!count;

  return (
    <TagRoot className={className} variant={variant}>
      <span># {tag}</span>
      {showCount && <TagCount>{count}</TagCount>}
    </TagRoot>
  );
};

export default Tag;
