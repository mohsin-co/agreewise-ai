"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
// Since we can't use fs on the client, we would need an API route.
// But for the sake of this animation example, let's assume the data is hardcoded for a moment.
// In a real app, this data would come from an API call inside a `useEffect` hook.

// This is a placeholder for the data fetching that would now need to be an API call.
const allPostsData = [
    { id: 'ai-and-legal-docs', date: '2024-08-24', title: 'How AI is Changing How We Understand Legal Docs', summary: 'For decades, legal documents have been unreadable...' },
    { id: 'tiktok-vs-instagram', date: '2024-08-23', title: 'TikTok vs. Instagram: A Privacy Policy Showdown', summary: 'Two social media giants, two different approaches...' },
    { id: 'why-reading-matters', date: '2024-08-22', title: 'Why Reading Terms of Service Actually Matters', summary: 'It\'s the most skipped-over document on the internet...' },
    { id: '5-red-flags', date: '2024-08-21', title: '5 Red Flags to Look For in a Privacy Policy', summary: 'Not all privacy policies are created equal...' },
];

export default function BlogPage() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          The AgreeWise Blog
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-light-gray">
          Insights on digital privacy, legal tech, and how to stay safe online.
        </p>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 gap-8">
          {allPostsData.map(({ id, date, title, summary }) => (
            <motion.div key={id} variants={itemVariants}>
              <Link 
                href={`/blog/${id}`} 
                className="block p-8 rounded-lg border border-border-gray bg-gray-800/50 hover:bg-gray-800/80 hover:border-brand-blue transition-all duration-300"
              >
                <article>
                  <p className="text-sm text-light-gray mb-2">
                    <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </p>
                  <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
                  <p className="text-light-gray">{summary}</p>
                  <div className="mt-6 font-semibold text-brand-blue">Read post →</div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}