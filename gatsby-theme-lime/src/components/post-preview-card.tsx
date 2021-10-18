import tw, { styled } from "twin.macro";
import { graphql, Link } from "gatsby";
import normalize from "normalize-path";
import Card, { CardHeader, CardContent, CardFooter } from "./card";
import Tag, { TagList } from "./tag";
import { useLimeConfig } from "../hooks";

const Title = styled.h4(tw`inline-block text-lg`);

const Badge = styled.span([
  tw`ml-2 px-2 text-sm font-normal rounded-sm bg-warning-200 bg-opacity-50 whitespace-nowrap`,
]);

interface PostPreviewCardProps {
  className?: string;
  post: PostPreview;
}

const PostPreviewCard = ({ className, post }: PostPreviewCardProps) => {
  const { postsPrefix } = useLimeConfig();
  const showTags = post.tags && post.tags.length > 0;

  return (
    <Card rounded as="article" className={className}>
      <CardHeader>
        <Title>
          <Link
            tw="styled-underline"
            to={normalize(`/${postsPrefix}${post.slug}`)}
          >
            {post.title}
          </Link>
        </Title>
        {post.draft && <Badge>🚧 work in progress</Badge>}
      </CardHeader>
      <CardContent>{post.description || post.excerpt}</CardContent>
      {showTags && (
        <CardFooter>
          <TagList>
            {post.tags.map((tag) => (
              <Link key={tag.slug} to={tag.slug}>
                <Tag tag={tag.name} />
              </Link>
            ))}
          </TagList>
        </CardFooter>
      )}
    </Card>
  );
};

export default PostPreviewCard;

export const PostPreviewCardList = styled.div(tw`space-y-4`);

export const postPreviewFragment = graphql`
  fragment PostPreview on Post {
    slug
    title
    draft
    tags {
      name
      slug
    }
    description
    excerpt
  }
`;
