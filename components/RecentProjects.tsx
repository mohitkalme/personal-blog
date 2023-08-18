import ProjectCard from "@/components/ProjectCard";
import AnimatedDiv from "@/components/framerMotion/AnimatedDiv";

import Link from "next/link";

import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

type Props = {
  MAX_PROJECTS: number;
};

type ProjectsData = {
  title: string;
  description: string;
  tags: string[];
  links: string[];
  mainImage: any;
};
const query = groq`
*[_type=='projects'] {
...,
'mainImageUrl': mainImage.asset->url 
}
`;

const RecentProjects = async ({ MAX_PROJECTS }: Props) => {
  const projectsData: any = await client.fetch(query);
  const projectsList = projectsData.slice(0, MAX_PROJECTS);

  return (
    <>
      <div className="divide-y divide-gray-700">
        <div className="my-4">
          <span className="font-poppins title-font text-3xl font-bold">
            Recent Projects
          </span>
        </div>
        <div className="py-5">
          <AnimatedDiv
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { delayChildren: 0, staggerChildren: 0.1 },
              },
            }}
            className="mx-auto grid grid-cols-1 gap-4 md:ml-[20%] xl:ml-[24%]"
          >
            {projectsList.map((d: any) => (
              <ProjectCard
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.mainImageUrl}
                githubRepo={d.links ? d.links[0] : ""}
                tags={d.tags}
                livePreview={d.links ? d.links[1] : ""}
              />
            ))}
          </AnimatedDiv>
        </div>
        {/* <div className="mt-5 flex justify-end text-base font-medium leading-6">
          <Link
            href="/projects"
            className="mt-5 hover:text-primary-400"
            aria-label="all posts"
          >
            All Projects &rarr;
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default RecentProjects;
