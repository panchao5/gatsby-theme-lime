import { useState } from "react";
import tw, { styled, css } from "twin.macro";
import { Link } from "gatsby";
import BurgerButton from "../components/burger-button";

interface NavbarProps {
  className?: string;
  siteMetadata: SiteMetadata;
  limeConfig: LimeConfig;
}

const NavLink = styled(Link)(tw`hover:styled-underline`);

const Navbar = (props: NavbarProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav
      className={props.className}
      tw="flex items-center h-12 text-white bg-gray-700 shadow-md"
    >
      <Link to="/">
        <h2 tw="ml-4">{props.siteMetadata.siteTitle}</h2>
      </Link>
      <div tw="flex-1"></div>
      <div tw="lt-md:hidden mr-4 md:space-x-4 lg:space-x-8">
        <NavLink to="/">Home</NavLink>
        {props.limeConfig.navigation.map(({ title, slug }) => {
          return <NavLink to={slug}>{title}</NavLink>;
        })}
      </div>
      <BurgerButton tw="md:hidden" open={showMenu} onClick={handleToggle} />
    </nav>
  );
};

export default Navbar;
