import { Link, navigate, PageProps } from "gatsby";
import "twin.macro";
import normalize from "normalize-path";
import Layout from "./layout";
import PostPreviewCard, { PostPreviewCardList } from "./post-preview-card";
import Pagination from "./pagination";
import { useLimeConfig } from "../hooks";
import { t } from "../utils";
import Card from "./card";
import { POSTS_BY_TAG, SEE_ALL_TAGS } from "../constants";

type TagPageData = {
  posts: {
    nodes: Array<PostPreview>;
  };
};

type TagPageContext = {
  tag: PostTag;
  current: number;
  pageCount: number;
};

const TagPage = (props: PageProps<TagPageData, TagPageContext>) => {
  const { basePath, tagsPath } = useLimeConfig();

  const { tag, current, pageCount } = props.pageContext;
  const posts = props.data.posts.nodes;

  const handleChange = (page: number) =>
    navigate(
      normalize(
        `/${basePath}/${tagsPath}/${tag.slug}${page > 1 ? `/${page}` : ""}`
      )
    );

  return (
    <Layout>
      <div tw="mx-2 my-4">
        <div>
          <span tw="block text-2xl">{t(POSTS_BY_TAG, { tag: tag.name })}</span>
          <Link
            to={normalize(`/${basePath}/${tagsPath}`)}
            tw="mt-4 text-sm text-primary-500"
          >
            {SEE_ALL_TAGS}
          </Link>
        </div>

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
