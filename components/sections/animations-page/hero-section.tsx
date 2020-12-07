import React from "react";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div className="text-center flex flex-col items-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block dark:text-gray-100">Les animations avec</span>
          <span className="block text-gsap">GSAP</span>
        </h1>
        <p className="mt-3 text-base text-gray-500 dark:text-white sm:mt-5 sm:text-lg  md:text-xl w-100 md:w-1/2">
          GSAP est un peu comme le couteau suisse de l'animation javascript... mais en mieux.
        </p>
        <p className="mt-3 text-base text-gray-500 dark:text-white sm:mt-5 sm:text-lg md:text-xl w-100 md:w-1/2">
          Voici quelques exemples d'utilisation.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <Link href="/">
              <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Get started
              </a>
            </Link>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <Link href="/">
              <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                Live demo
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
