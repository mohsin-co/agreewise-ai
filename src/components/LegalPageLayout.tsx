// src/components/LegalPageLayout.tsx
export default function LegalPageLayout({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">{title}</h1>
      <p className="text-light-gray mb-12">Last updated: August 20, 2024</p>
      <div className="prose prose-invert prose-lg max-w-none">
        {children}
      </div>
    </div>
  );
}