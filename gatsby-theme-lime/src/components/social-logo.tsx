import { ReactNode } from "react";
import tw, { css, TwStyle } from "twin.macro";
import {
  LogoGithubIcon,
  LogoInstagramIcon,
  LogoTwitterIcon,
  LogoWechatIcon,
  LogoWeiboIcon,
} from "./icons";

type SizeVariant = "sm" | "md" | "lg";

interface PlainSocialLogoProps {
  className?: string;
  size?: SizeVariant;
  background?: string;
  children?: ReactNode;
}

interface SocialLogoProps extends PlainSocialLogoProps {
  name: string;
}

const styles: Record<SizeVariant, TwStyle> = {
  sm: tw`w-6 h-6`,
  md: tw`w-8 h-8 text-lg`,
  lg: tw`w-10 h-10 text-2xl`,
};

const PlainSocialLogo = ({
  className,
  size = "md",
  children,
}: PlainSocialLogoProps) => {
  const logo = typeof children === "string" ? children?.[0] : children;

  return (
    <div
      className={className}
      css={[
        tw`flex justify-center items-center rounded-full bg-gray-500 text-white overflow-hidden`,
        styles[size],
      ]}
    >
      {logo}
    </div>
  );
};

const logos = [
  {
    name: "github",
    icon: LogoGithubIcon,
    extraStyle: tw`bg-[#24292F]`,
  },
  {
    name: "weibo",
    icon: LogoWeiboIcon,
    extraStyle: tw`bg-[#E6172D]`,
  },

  {
    name: "wechat",
    icon: LogoWechatIcon,
    extraStyle: tw`bg-[#02DE6D]`,
  },

  {
    name: "twitter",
    icon: LogoTwitterIcon,
    extraStyle: tw`bg-[#1DA1F3]`,
  },
  {
    name: "instagram",
    icon: LogoInstagramIcon,
    extraStyle: css`linear-gradient(45deg, #405de6,#5851db, #833ab4, #c13584, #e1306c, #fd1d1d)`,
  },
];

const SocialLogo = ({ name, ...rest }: SocialLogoProps) => {
  const logo = logos.find((logo) => logo.name === name);
  if (!logo) {
    return null;
  }

  return (
    <PlainSocialLogo css={logo.extraStyle} {...rest}>
      <logo.icon />
    </PlainSocialLogo>
  );
};

export default SocialLogo;
