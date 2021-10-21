import Layout from "./layout";
import "twin.macro";
import { Link, PageProps } from "gatsby";
import { groupBy, toUpper } from "lodash";
import normalize from "normalize-path";
import Card from "./card";
import Tag from "./tag";
import { useLimeConfig } from "../hooks";
import { ALL_TAGS } from "../constants";

type TagsPageData = {
  tags: Array<{
    tag: PostTag;
    totalCount: number;
  }>;
};

const TagsPage = (props: PageProps<TagsPageData>) => {
  const { basePath, tagsPath } = useLimeConfig();

  const { tags } = props.data;

  const tagsGroup = groupBy(tags, ({ tag, totalCount }) => {
    return toUpper(tag.name[0]);
  });

  return (
    <Layout>
      <div tw="mx-2 my-4">
        <span tw="block text-2xl">{ALL_TAGS}</span>
        <Card tw="p-4 mt-4 space-y-8" rounded>
          {Object.keys(tagsGroup)
            .sort()
            .map((init) => {
              return (
                <article key={init}>
                  <h2 tw="mb-2 text-gray-700 text-lg font-medium">{init}</h2>
                  <div tw="space-x-2">
                    {tagsGroup[init].map(({ tag, totalCount }) => (
                      <Link
                        key={tag.slug}
                        to={normalize(`/${basePath}/${tagsPath}/${tag.slug}`)}
                      >
                        <Tag
                          variant="outline"
                          tag={
                            <span>
                              {tag.name}
                              <span tw="inline-block ml-2 bg-primary-400 rounded-full w-4 h-4 text-xs text-white text-center leading-4">
                                {totalCount}
                              </span>
                            </span>
                          }
                        />
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
        </Card>
      </div>
    </Layout>
  );
};

export default TagsPage;
