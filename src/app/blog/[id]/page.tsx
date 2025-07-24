import { getPostData, getAllPostIds } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

// --- Metadata and Static Params functions (no changes here) ---
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const postData = await getPostData(params.id);
  return {
    title: `${postData.title} | AgreeWise.ai Blog`,
    description: postData.summary,
  };
}
// This function tells Next.js which pages to pre-build
export async function generateStaticParams() {
  const ids = getAllPostIds(); // This now returns a simple string array
  return ids.map((id) => ({
    id: id,
  }));
}

// --- The Page Component (with the styling fix) ---
export default async function PostPage({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <article>
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {postData.title}
          </h1>
          <p className="text-light-gray">
            Published on{" "}
            <time dateTime={postData.date}>
              {new Date(postData.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
        </header>

        {/* --- THE FIX IS HERE --- */}
        <div
          // 1. 'prose' activates the typography plugin.
          // 2. 'prose-invert' styles it for a dark background.
          // 3. 'prose-lg' makes the text slightly larger for readability.
          // 4. 'text-justify' applies the justified text alignment you requested.
          className="prose prose-invert prose-lg max-w-none text-justify"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />

        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="text-brand-blue hover:underline font-semibold"
          >
            ← Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}
