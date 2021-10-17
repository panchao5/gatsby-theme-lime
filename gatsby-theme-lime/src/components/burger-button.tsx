import tw, { styled, css } from "twin.macro";
import { px } from "../utils";

const BurgerButtonInner = styled.button(
  tw`inline-block relative box-border m-0 outline-none align-middle appearance-none cursor-pointer`,
  css({
    height: `var(--burger-size)`,
    padding: `0 0 0 var(--burger-size)`,
    lineHeight: `var(--burger-size)`,
    transition: `background-color 0.2s ease`,
    [`&.cross`]: tw`bg-primary-400`,
  })
);

const BurgerBar = styled.span(
  tw`block absolute`,
  css({
    left: `calc(var(--burger-size) * ((1 - var(--burger-bar-width)) / 2))`,
    width: `calc(var(--burger-size) * var(--burger-bar-width))`,
    height: `var(--burger-bar-height)`,
    transition: `background-color 0.2s ease`,
    backgroundColor: `currentcolor`,
  })
);

const TopBurgerBar = styled(BurgerBar)(
  css({
    bottom: `calc(50% + var(--burger-bar-spacing))`,
    transition: `bottom 0.2s ease, transform 0.2s ease`,
    transitionDelay: "0.1s, 0s",
    [`${BurgerButtonInner}.cross &`]: {
      bottom: `calc(50% - (var(--burger-bar-height) / 2))`,
      transform: `rotate(45deg)`,
      transitionDelay: `0s, 0.1s`,
    },
  })
);

const MiddleBurgerBar = styled(BurgerBar)(
  css({
    bottom: `calc(50% - (var(--burger-bar-height) / 2))`,
    opacity: 1,
    transition: "opacity 0.2s ease",
    transitionDelay: "0.1s",
    [`${BurgerButtonInner}.cross &`]: {
      opacity: 0,
    },
  })
);

const BottomBurgerBar = styled(BurgerBar)(
  css({
    top: `calc(50% + var(--burger-bar-spacing))`,
    transition: `top 0.2s ease, transform 0.2s ease`,
    transitionDelay: "0.1s, 0s",
    [`${BurgerButtonInner}.cross &`]: {
      top: `calc(50% - (var(--burger-bar-height) / 2))`,
      transform: `rotate(-45deg)`,
      transitionDelay: `0s, 0.1s`,
    },
  })
);

interface BurgerButtonProps {
  size?: number;
  barHeight?: number;
  className?: string;
  open?: boolean;
  onClick?: () => void;
}

const BurgerButton = (props: BurgerButtonProps) => {
  const size = px(props.size ?? 48);
  const barHeight = px(props.barHeight ?? 3);
  const open = props.open ?? false;
  const className = props.className ?? "";

  const innerClassName = open ? `${className} cross` : className;

  return (
    <BurgerButtonInner
      className={innerClassName}
      css={{
        "--burger-size": size,
        "--burger-bar-width": 0.4,
        "--burger-bar-height": barHeight,
        "--burger-bar-spacing": px(6),
      }}
      onClick={props.onClick}
    >
      <TopBurgerBar />
      <MiddleBurgerBar />
      <BottomBurgerBar />
    </BurgerButtonInner>
  );
};

export default BurgerButton;
