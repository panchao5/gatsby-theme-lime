import { PageProps } from "gatsby";
import TagsPage from "../components/tags-page";

export default (props: PageProps<any, any>) => {
  const { tags, ...other } = props.pageContext;

  const newData = { ...props.data, tags };
  const newPageContext = other;

  const pageProps: PageProps<any, any> = {
    ...props,
    data: newData,
    pageContext: newPageContext,
    pageResources: {
      ...props.pageResources,
      json: {
        data: newData,
        pageContext: newPageContext,
      },
    },
  };
  return <TagsPage {...pageProps} />;
};
