import { getPostData, getAllPostIds } from '@/lib/posts';
import Link from 'next/link';
import type { Metadata } from 'next';

// This function generates dynamic metadata for each post
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const postData = await getPostData(params.id);
  return {
    title: `${postData.title} | AgreeWise.ai Blog`,
    description: postData.summary, // Use the post's summary for the description
  };
}

// This function tells Next.js which pages to pre-build
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map(path => ({ id: path.params.id }));
}

// This is the main component for displaying a single post
export default async function PostPage({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <article>
        {/* ... rest of the component is the same ... */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {postData.title}
          </h1>
          <p className="text-light-gray">
            Published on <time dateTime={postData.date}>{new Date(postData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </p>
        </header>

        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />

        <div className="mt-16 text-center">
          <Link href="/blog" className="text-brand-blue hover:underline font-semibold">
            ← Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}