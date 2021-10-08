import tw, { styled } from "twin.macro";

export const Card = styled.div<{ rounded?: boolean }>(
  tw`shadow-md bg-white overflow-hidden`,
  ({ rounded }) => rounded && tw`rounded-md`
);

export default Card;

export const CardHeader = styled.header(tw`px-4 py-2 font-medium`);

export const CardContent = styled.div(tw`p-4`);

export const CardFooter = styled.footer(tw`px-4 py-2`);
