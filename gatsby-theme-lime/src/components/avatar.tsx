import { GatsbyImage } from "gatsby-plugin-image";
import tw, { css, styled } from "twin.macro";

interface AvatarProps {
  size?: number | string;
}

const Avatar = styled(GatsbyImage)<AvatarProps>(({ size = 100 }) => {
  return [
    tw`shadow-md border-2 border-white rounded-full`,
    css({
      width: size,
      height: size,
    }),
  ];
});

export default Avatar;
