import Link from 'next/link';

// We can add props later to change the size or color if needed
const Logo = () => {
  return (
    <Link href="/" className="text-2xl font-bold transition-opacity hover:opacity-80">
      AgreeWise<span className="text-brand-blue">.ai</span>
    </Link>
  );
};

export default Logo;