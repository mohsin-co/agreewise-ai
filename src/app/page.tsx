import AnalyzerTool from "@/components/AnalyzerTool";
import AnimatedSection from "@/components/AnimatedSection"; // Make sure to import this

// This is our reusable Feature Card component
const FeatureCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-gray-800 p-6 rounded-lg border border-border-gray">
    <h3 className="text-xl font-bold mb-2 text-brand-blue">{title}</h3>
    <p className="text-light-gray">{children}</p>
  </div>
);

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* ===== HERO SECTION ===== */}
      <AnimatedSection>
        <section className="text-center py-24 sm:py-32">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            Your Personal <span className="text-brand-blue">AI Legal Analyst</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-light-gray">
            Stop clicking 'I Agree' blindly. Paste any privacy policy or terms of service
            to get a clear, simple summary of what really matters.
          </p>
        </section>
      </AnimatedSection>

      {/* ===== ANALYZER TOOL SECTION ===== */}
      <AnimatedSection>
        <section className="mb-24 sm:mb-32">
          <AnalyzerTool />
        </section>
      </AnimatedSection>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <AnimatedSection>
        <section className="text-center mb-24 sm:mb-32">
          <h2 className="text-3xl font-bold mb-12">A Simpler Way to Understand</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-blue-500/20 text-blue-300 rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Paste a Link</h3>
              <p className="text-light-gray">Copy the URL of the policy you want to check.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-500/20 text-blue-300 rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Click 'Analyze'</h3>
              <p className="text-light-gray">Our AI reads and analyzes the full text in seconds.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-500/20 text-blue-300 rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Get Your Summary</h3>
              <p className="text-light-gray">Receive a clear summary and scannable key points.</p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== FEATURES SECTION ===== */}
      <AnimatedSection>
        <section className="text-center mb-24 sm:mb-32">
          <h2 className="text-3xl font-bold mb-12">More Than Just a Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard title="Powered by Advanced AI">
              We use a fine-tuned AI model to provide analysis that is more accurate and relevant than generic chatbots.
            </FeatureCard>
            <FeatureCard title="Secure & Private">
              Your privacy is paramount. We don't store the policies you scan or link them to you.
            </FeatureCard>
            <FeatureCard title="Instant Results">
              Don't waste hours reading dense legal documents. Get the insights you need in a matter of seconds.
            </FeatureCard>
          </div>
        </section>
      </AnimatedSection>

    </div>
  );
}