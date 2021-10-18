import { useState, useEffect } from "react";
import tw, { styled, css, theme } from "twin.macro";
import { Fragment, ReactNode } from "react";
import { Link } from "gatsby";
import GlobalStyles from "../styles/global-styles";
import Navbar from "./navbar";
import Footer from "./footer";
import ProfileCard from "./profile-card";
import { useSiteMetadata, useLimeConfig, useMedia } from "../hooks";

const Container = styled.div(
  tw`md:(px-4 w-10/12 mx-auto flex flex-row justify-center items-start) lg:w-9/12 xl:w-8/12`
);

interface LayoutProps {
  children: ReactNode;
}

export default (props: LayoutProps) => {
  const siteMetadata = useSiteMetadata();
  const limeConfig = useLimeConfig();
  const [burger, setBurger] = useState<"open" | "closed">("closed");

  const isMdScreen = useMedia(`(min-width: ${theme("screens.md")})`);

  const handleToggle = () => {
    if (burger === "closed") {
      setBurger("open");
    } else {
      setBurger("closed");
    }
  };

  useEffect(() => {
    setBurger("closed");
  }, [isMdScreen]);

  return (
    <Fragment>
      <GlobalStyles />
      <div tw="fixed top-0 left-0 right-0 z-50">
        <header>
          <Navbar
            burger={burger}
            siteMetadata={siteMetadata}
            limeConfig={limeConfig}
            onClickBurger={handleToggle}
          />
        </header>
      </div>
      <div tw="mt-12 overflow-auto">
        <Container>
          {isMdScreen ? (
            <div tw="w-[240px] lg:w-[320px] mt-4 mr-2">
              <aside>
                <ProfileCard />
              </aside>
            </div>
          ) : (
            <div
              css={css(
                tw`fixed w-[280px] top-12 bottom-0 overflow-auto bg-white transition-all ease-in duration-200`,
                burger === "open" ? tw`right-0` : tw`right-[-280px]`
              )}
            >
              <aside tw="shadow-md">
                <ProfileCard tw="rounded-none shadow-none" />
                <div>
                  <ul tw="text-gray-700 text-sm text-center divide-y px-4 divide-dashed divide-gray-400 divide-opacity-25">
                    {limeConfig.navigation.map(({ title, slug }) => {
                      return (
                        <li key={slug} tw="py-4">
                          <Link to={slug} tw="styled-underline">
                            {title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </aside>
            </div>
          )}
          <main tw="flex-1">{props.children}</main>
        </Container>
        <Footer siteMetadata={siteMetadata} />
      </div>
    </Fragment>
  );
};
