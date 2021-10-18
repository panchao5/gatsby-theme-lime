import { Link, PageProps } from "gatsby";
import "twin.macro";
import normalize from "normalize-path";
import Layout from "./layout";
import PostPreviewCard, { PostPreviewCardList } from "./post-preview-card";
import { useLimeConfig } from "../hooks";
import { t } from "../utils";
import { POSTS_BY_TAG, SEE_ALL_TAGS } from "../constants";

type TagPageData = {
  posts: {
    nodes: Array<PostPreview>;
  };
};

type TagPageContext = {
  tagName: string;
  tagSlug: string;
};

const TagPage = (props: PageProps<TagPageData, TagPageContext>) => {
  const { basePath, tagsPath } = useLimeConfig();

  const { tagName } = props.pageContext;
  const posts = props.data.posts.nodes;

  return (
    <Layout>
      <div tw="mx-2 my-4">
        <div>
          <span tw="block text-2xl">{t(POSTS_BY_TAG, { tag: tagName })}</span>
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
      </div>
    </Layout>
  );
};

export default TagPage;
