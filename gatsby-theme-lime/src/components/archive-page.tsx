import { Link, navigate, PageProps } from "gatsby";
import "twin.macro";
import normalize from "normalize-path";
import Layout from "./layout";
import PostPreviewCard, { PostPreviewCardList } from "./post-preview-card";
import Pagination from "./pagination";
import { useLimeConfig } from "../hooks";
import Card from "./card";

type TagPageData = {
  allPost: {
    nodes: Array<PostPreview>;
  };
};

type TagPageContext = {
  current: number;
  pageCount: number;
};

const TagPage = (props: PageProps<TagPageData, TagPageContext>) => {
  const { basePath, blogPath } = useLimeConfig();

  const { current, pageCount } = props.pageContext;
  const posts = props.data.allPost.nodes;

  const handleChange = (page: number) =>
    navigate(
      normalize(`/${basePath}/${blogPath}${page > 1 ? `/${page}` : ""}`)
    );

  return (
    <Layout>
      <div tw="mx-2 my-4">
        <PostPreviewCardList tw="mt-4">
          {posts.map((post) => {
            return <PostPreviewCard key={post.slug} post={post} />;
          })}
        </PostPreviewCardList>

        <Card rounded tw="mt-4 py-2 flex justify-center">
          <Pagination
            tw="mx-auto"
            current={current}
            pageCount={pageCount}
            onChange={handleChange}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default TagPage;
