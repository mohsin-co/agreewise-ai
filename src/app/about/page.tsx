import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* --- HERO SECTION --- */}
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Bringing Clarity to the Fine Print
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-light-gray">
          AgreeWise.ai was born from a simple idea: everyone has the right to
          understand the agreements they sign. We&apos;re here to make that a
          reality.
        </p>
      </section>

      {/* --- OUR MISSION SECTION --- */}
      <section className="mt-20">
        <div className="p-8 bg-gray-800 rounded-lg border border-border-gray">
          <h2 className="text-3xl font-bold text-center text-brand-blue">
            Our Mission
          </h2>
          <p className="mt-4 text-center text-lg text-gray-300">
            In an increasingly digital world, we are constantly asked to consent
            to terms we don&apos;t have time to read, written in language we
            can&apos;t always understand. Our mission is to restore the balance,
            providing every user with a clear, unbiased, and instant analysis of
            any online policy. We are committed to fostering a more transparent
            digital environment, empowering you to make informed decisions with
            confidence and peace of mind.
          </p>
        </div>
      </section>

      {/* --- OUR STORY SECTION --- */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center">Our Story</h2>
        <p className="mt-4 text-lg text-gray-300">
          The idea for AgreeWise.ai sparked from a personal, frustrating
          experience—a situation that millions face every day. We sign up for
          services, download apps, and purchase products, and with each action,
          we&apos;re cleverly nudged to agree to terms that are intentionally
          lengthy and complex. I realized that a single overlooked clause could
          have serious consequences down the line.
        </p>
        <p className="mt-4 text-lg text-gray-300">
          I knew there had to be a better way. This wasn&apos;t just my problem;
          it was everyone&apos;s problem. That realization was the beginning of
          AgreeWise.ai—a straightforward solution designed to cut through the
          noise and expose the shady terms and conditions designed to take
          advantage of the uninformed. This tool was built for you.
        </p>
      </section>

      {/* --- MEET THE FOUNDER SECTION --- */}
      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold">Meet the Founder</h2>
        <div className="mt-8 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gray-700 overflow-hidden">
            {/* This is a placeholder for your image. */}
            <Image
              src="/images/mohsin-avatar.jpg" // my photo
              alt="Mohsin, Founder of AgreeWise.ai"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <h3 className="mt-4 text-2xl font-semibold">Mohsin (Founder)</h3>
          <p className="mt-2 text-brand-blue">
            Building tools for a fairer digital world.
          </p>
        </div>
      </section>
    </div>
  );
}
