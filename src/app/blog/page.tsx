import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { Metadata } from "next";

// This is the correct metadata for the blog index page
export const metadata: Metadata = {
  title: "The AgreeWise Blog | Digital Privacy & Legal Tech Insights",
  description:
    "Stay informed with articles on data privacy, understanding terms of service, and how AI is changing the legal landscape for consumers.",
};

// This is a Server Component, so we can fetch data directly
export default function BlogPage() {
  // This line now correctly calls our file-reading function on the server
  const allPostsData = getSortedPostsData();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* --- HERO SECTION --- */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          The AgreeWise Blog
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-light-gray">
          Insights on digital privacy, legal tech, and how to stay safe online.
        </p>
      </section>

      {/* --- POSTS LIST SECTION --- */}
      <section>
        <div className="grid grid-cols-1 gap-8">
          {allPostsData.map(({ id, date, title, summary }) => (
            <Link
              href={`/blog/${id}`}
              key={id}
              className="block p-8 rounded-lg border border-border-gray bg-gray-800/50 hover:bg-gray-800/80 hover:border-brand-blue transition-all duration-300"
            >
              <article>
                <p className="text-sm text-light-gray mb-2">
                  <time dateTime={date}>
                    {new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </p>
                <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
                <p className="text-light-gray">{summary}</p>
                <div className="mt-6 font-semibold text-brand-blue">
                  Read post →
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
