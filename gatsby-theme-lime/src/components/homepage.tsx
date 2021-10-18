import "twin.macro";
import { PageProps } from "gatsby";
import Layout from "./layout";
import PostPreviewCard, { PostPreviewCardList } from "./post-preview-card";

type HomepageData = {
  allPost: {
    nodes: Array<PostPreview>;
  };
};

export default function Homepage(props: PageProps<HomepageData>) {
  const {
    data: {
      allPost: { nodes: posts },
    },
  } = props;

  return (
    <Layout>
      <PostPreviewCardList tw="mt-4 px-2">
        {posts.map((post) => (
          <PostPreviewCard key={post.slug} post={post} />
        ))}
      </PostPreviewCardList>
    </Layout>
  );
}
