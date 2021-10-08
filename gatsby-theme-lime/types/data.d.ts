interface LimeConfig {
  basePath: string;
  blogPath: string;
  postsPath: string;
  pagesPath: string;
  tagsPath: string;
}

type PostTag = {
  name: string;
  slug: string;
};

interface PreviewPost {
  slug: string;
  title: string;
  draft?: boolean;
  tags: Array<PostTag>;
  date?: string;
  description?: string;
  excerpt: string;
}

interface Post {
  slug: string;
  title: string;
  draft: boolean;
  banner: any;
  timeToRead: number;
  tags: Array<PostTag>;
  date: string;
  description: string;
  excerpt: string;
  body: string;
  html: string;
  canonicalUrl: string;
}
