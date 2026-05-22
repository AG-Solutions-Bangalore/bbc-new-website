import React, { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { featuresData } from "@/data/features-data";

const HomeAbout = lazy(() =>
  import("./home-deferred").then((module) => ({
    default: module.HomeAbout,
  }))
);
const HomeDeferredSections = lazy(() => import("./home-deferred"));

const HomeFeatureCard = ({ icon, title, description }) => (
  <div className="relative flex flex-col rounded-lg bg-white bg-clip-border text-gray-700 h-56 shadow-lg shadow-gray-500/10">
    <div className="p-6 px-8 text-center">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none relative mb-6 grid h-12 max-h-[48px] w-12 max-w-[48px] select-none place-items-center rounded-full bg-gradient-to-tr from-gray-900 to-gray-800 text-center align-middle font-sans text-sm font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all"
      >
        {icon}
      </button>
      <h2 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
        {title}
      </h2>
      <p className="block font-sans text-base font-normal leading-relaxed text-blue-gray-600 antialiased">
        {description}
      </p>
    </div>
  </div>
);

export function Home() {
  const [loadDeferredSections, setLoadDeferredSections] = useState(false);

  useEffect(() => {
    const loadSections = () => setLoadDeferredSections(true);
    const timeoutId = window.setTimeout(loadSections, 4500);
    window.addEventListener("scroll", loadSections, { passive: true, once: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", loadSections);
    };
  }, []);

  return (
    <>
      <section className="relative flex h-screen content-center items-center justify-center overflow-hidden pt-16 pb-32">
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet="/images/bbc_banner-mobile.jpg"
            width="960"
            height="422"
          />
          <img
            src="/images/bbc_banner.jpg"
            alt=""
            aria-hidden="true"
            width="1920"
            height="844"
            fetchPriority="high"
            decoding="async"
            className="absolute top-0 h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute top-0 h-full w-full bg-black/40 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <div className="home-hero-title">
                <h1 className="mb-6 block font-sans text-5xl font-black leading-tight tracking-normal text-white antialiased">
                  Your Most Trusted Business Partner.
                </h1>
              </div>
              <div className="home-hero-copy">
                <p className="block font-sans text-xl font-normal leading-relaxed text-white opacity-80 antialiased">
                  We provide expertise, connections and cultural awareness to
                  help your organizations reach new markets and make successful
                  deals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ title, icon, description, link }, index) => (
              <div
                key={title}
                className="home-feature-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={link} className="block">
                  <div className="transition-transform duration-300 hover:-translate-y-2.5 hover:scale-105 hover:shadow-xl">
                    <HomeFeatureCard
                      title={title}
                      icon={React.createElement(icon, {
                        className: "w-5 h-5 text-white",
                      })}
                      description={description}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {loadDeferredSections && (
            <Suspense fallback={null}>
              <HomeAbout />
            </Suspense>
          )}
        </div>
      </section>

      {loadDeferredSections && (
        <Suspense fallback={null}>
          <HomeDeferredSections />
        </Suspense>
      )}
    </>
  );
}

export default Home;
