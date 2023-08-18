"use client";
import { useEffect } from "react";
import { renderCanvas } from "../lib/utils/renderCanvas";

import Link from "next/link";

export default function Hero() {
  useEffect(() => {
    renderCanvas();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center my-6 xl:flex-row gap-x-12 xl:mb-12">
        <div className="pt-16 sm:pt-20">
          <h1 className="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Hi, I’m Mohit kalme{" "}
            <span role="img" aria-label="waving hand" className="wave">
              👋
            </span>
          </h1>
          <h2 className="text-lg prose text-gray-600 dark:text-gray-400">
            {`I am a full stack software engineer with a strong focus in front-end
            and system design. In my free time, I like developing `}
            <Link href="/projects">side projects</Link>
            {" and "}
            <Link href="/blog">blogging</Link>
            {" about them. Have a good read!"}
          </h2>
        </div>

        <canvas
          className=" z-40 bg-skin-base pointer-events-none absolute inset-0 "
          id="canvas"
        ></canvas>
      </div>
    </>
  );
}
