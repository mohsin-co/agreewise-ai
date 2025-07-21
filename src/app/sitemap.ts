import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPostsData();
  const postUrls = posts.map(({ id }) => ({
    url: `https://www.agreewise.ai/blog/${id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: 'https://www.agreewise.ai',
      lastModified: new Date(),
    },
    {
      url: 'https://www.agreewise.ai/about',
      lastModified: new Date(),
    },
    {
      url: 'https://www.agreewise.ai/blog',
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}