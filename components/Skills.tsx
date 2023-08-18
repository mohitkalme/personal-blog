"use client";
import {
  SiReact,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiRedux,
  SiFirebase,
  SiGit,
  SiMysql,
  SiMongodb,
  SiPrisma,
} from "react-icons/si";

import {
  showHoverAnimation,
  removeHoverAnimation,
} from "../lib/utils/windowAnimation";

const skills = [
  {
    name: "TypeScript",
    logo: SiTypescript,
  },
  {
    name: "HTML",
    logo: SiHtml5,
  },
  {
    name: "CSS",
    logo: SiCss3,
  },
  {
    name: "JavaScript",
    logo: SiJavascript,
  },
  {
    name: "React",
    logo: SiReact,
  },
  {
    name: "Tailwind CSS",
    logo: SiTailwindcss,
  },
  {
    name: "Nextjs",
    logo: SiNextdotjs,
  },
  {
    name: "Node.js",
    logo: SiNodedotjs,
  },
  {
    name: "MySQL",
    logo: SiMysql,
  },
  {
    name: "Redux",
    logo: SiRedux,
  },

  {
    name: "Firebase",
    logo: SiFirebase,
  },
  {
    name: "Git",
    logo: SiGit,
  },
  {
    name: "MongoDB",
    logo: SiMongodb,
  },
  {
    name: "Prisma",
    logo: SiPrisma,
  },
];

const Skills = () => {
  return (
    <>
      <span className="font-poppins title-font text-3xl font-bold">
        My Top Skills
      </span>
      <div className="my-10 grid grid-cols-3 gap-4">
        {skills.map((skill, index) => {
          return (
            <div
              title={skill.name}
              key={skill.name}
              onMouseMove={(e) => showHoverAnimation(e)}
              onMouseLeave={(e) => removeHoverAnimation(e)}
              className="dark:bg-darkPrimary flex transform items-center justify-center gap-4 rounded-sm border p-4 dark:border-neutral-700  sm:justify-start "
            >
              <div className="pointer-events-none relative select-none">
                <skill.logo className="h-8 w-8" />
              </div>
              <p className="pointer-events-none hidden select-none text-sm font-semibold sm:inline-flex md:text-base">
                {skill.name}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Skills;
