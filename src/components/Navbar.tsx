import Link from "next/link";
import Logo from "./Logo"; // <-- IMPORT THE LOGO COMPONENT

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo /> {/* <-- USE THE LOGO COMPONENT */}
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/about" // <-- ADDED ABOUT LINK
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
