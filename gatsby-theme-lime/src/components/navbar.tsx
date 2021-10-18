import tw, { styled, css } from "twin.macro";
import { Link } from "gatsby";
import BurgerButton from "./burger-button";

interface NavbarProps {
  className?: string;
  siteMetadata: SiteMetadata;
  limeConfig: LimeConfig;
  burger?: "open" | "closed";
  onClickBurger?: () => void;
}

const NavLink = styled(Link)(tw`hover:styled-underline`);

const Navbar = (props: NavbarProps) => {
  const open = props.burger === "open";

  return (
    <nav className={props.className}>
      <div tw="flex items-center h-12 text-white bg-gray-700 shadow-md">
        <Link to="/">
          <h2 tw="ml-4">{props.siteMetadata.siteTitle}</h2>
        </Link>
        <div tw="flex-1"></div>
        <div tw="lt-md:hidden mr-4 md:space-x-4 lg:space-x-8">
          <NavLink to="/">Home</NavLink>
          {props.limeConfig.navigation.map(({ title, slug }) => {
            return (
              <NavLink key={slug} to={slug}>
                {title}
              </NavLink>
            );
          })}
        </div>
        <BurgerButton
          tw="md:hidden"
          open={open}
          onClick={props.onClickBurger}
        />
      </div>
    </nav>
  );
};

export default Navbar;
