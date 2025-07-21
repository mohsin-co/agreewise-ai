import Link from 'next/link';
import Logo from './Logo'; // Assuming you might want the logo here too

export default function Footer() {
  return (
    <footer className="w-full mt-24">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 border-t border-border-gray">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
          <Logo />
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/about" className="text-base text-light-gray hover:text-white transition-colors">About</Link>
            <Link href="/blog" className="text-base text-light-gray hover:text-white transition-colors">Blog</Link>
            <Link href="/terms" className="text-base text-light-gray hover:text-white transition-colors">Terms of Service</Link> {/* <-- ADDED */}
            <Link href="/privacy" className="text-base text-light-gray hover:text-white transition-colors">Privacy Policy</Link> {/* <-- ADDED */}
          </div>
          <p className="text-center text-sm text-light-gray sm:text-right">
            © {new Date().getFullYear()} AgreeWise.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}