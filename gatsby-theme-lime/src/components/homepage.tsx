import tw, { styled } from "twin.macro";
import { PageProps } from "gatsby";
import Layout from "./layout";
import ProfileCard from "./profile-card";
import PostPreviewCard, { PostPreviewCardList } from "./post-preview-card";

type HomepageData = {
  allPost: {
    nodes: Array<PostPreview>;
  };
};

const Container = styled.div(
  tw`mt-4 md:px-4 md:flex flex-row justify-center items-start`
);

export default function Homepage(props: PageProps<HomepageData>) {
  const {
    data: {
      allPost: { nodes: posts },
    },
  } = props;

  return (
    <Layout>
      <Container>
        <ProfileCard tw="md:mr-2 lt-md:hidden mb-2" />
        <PostPreviewCardList tw="px-2 w-full max-w-[70ch]">
          {posts.map((post) => (
            <PostPreviewCard key={post.slug} post={post} />
          ))}
        </PostPreviewCardList>
      </Container>
    </Layout>
  );
}
