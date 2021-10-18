import tw, { styled } from "twin.macro";
import { Link, PageProps } from "gatsby";
import Layout from "./layout";
import Card from "./card";
import Alert from "./alert";
import Tag from "./tag";
import mdxComponents from "./mdx-components";
import { MDXProvider } from "@mdx-js/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import normalize from "normalize-path";

type PostPageData = {
  post: Post;
};

const Container = styled.div(tw`md:(w-[70ch] mt-6 mx-auto)`);

const Article = styled.article(tw`p-4`);

const Title = styled.h1(tw`font-semibold mb-2 text-4xl`);

const Meta = styled.div(tw`mb-2 text-gray-500 text-sm space-x-4`);

const Content = styled.div("markdown", tw`prose max-w-none`);

const PostPage = ({ data }: PageProps<PostPageData>) => {
  const { post } = data;

  const showTags = post.tags && post.tags.length > 0;

  const banner = getImage(post.banner);

  return (
    <Layout>
      <Container>
        <Card rounded css={tw`lt-md:(rounded-none shadow-none)`}>
          {banner && <GatsbyImage image={banner} alt="" />}
          <MDXProvider components={mdxComponents}>
            <Article>
              <header>
                {post.draft && (
                  <Alert tw="text-sm mb-2" variant="warning">
                    作者正在努力创作本篇博文中，敬请期待！
                  </Alert>
                )}
                <Title>{post.title}</Title>
                <Meta>发布于 {post.date}</Meta>
              </header>
              <Content>
                {post.description && (
                  <Alert tw="my-4" variant="info">
                    {post.description}
                  </Alert>
                )}
                <MDXRenderer>{post.body}</MDXRenderer>
              </Content>

              {showTags && (
                <footer>
                  <div tw="mt-4 space-x-2">
                    {post.tags.map((tag) => (
                      <Link key={tag.name} to={normalize(`/posts/${tag.slug}`)}>
                        <Tag tag={tag.name} />
                      </Link>
                    ))}
                  </div>
                </footer>
              )}
            </Article>
          </MDXProvider>
        </Card>
      </Container>
    </Layout>
  );
};

export default PostPage;
