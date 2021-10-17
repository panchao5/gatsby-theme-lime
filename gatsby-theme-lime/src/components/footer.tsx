import tw from "twin.macro";

interface FooterProps {
  siteMetadata: SiteMetadata;
}

const Footer = ({ siteMetadata }: FooterProps) => {
  return (
    <footer css={tw`mt-6 mb-4 text-sm text-center`}>
      &copy; 2021 {siteMetadata.author} ❤️ Powered by{" "}
      <a css={tw`underline`} href="https://www.gatsbyjs.com/">
        Gatsby
      </a>
    </footer>
  );
};

export default Footer;
