interface LimeConfig {
  basePath: string;
  blogPath: string;
  postsPath: string;
  pagesPath: string;
  resourcesPath: string;
  tagsPath: string;
  navigation: NavigationEntry[];
}

type NavigationEntry = {
  title: string;
  slug: string;
};

interface SiteMetadata {
  siteUrl: string;
  siteTitle: string;
  author: string;
  authorBio?: string;
  authorPath?: string;
  authorAvatar: any;
  socialLinks?: Array<{ name: string; link: string }>;
}

type PostTag = {
  name: string;
  slug: string;
};

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

type PostPreview = Pick<
  Post,
  "slug" | "title" | "draft" | "tags" | "description" | "excerpt"
>;
