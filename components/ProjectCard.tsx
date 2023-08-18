import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { MdOutlineLink } from "react-icons/md";

type Props = {
  title: string;
  description: string;
  imgSrc: string;
  githubRepo: string;
  livePreview: string;
  tags: string[];
};
const ProjectCard = ({
  title,
  description,
  imgSrc,
  githubRepo,
  tags,
  livePreview,
}: Props) => (
  <div className="flex max-w-2xl flex-col items-center gap-8 rounded-lg p-5 sm:mt-6 sm:flex-row sm:p-1">
    <div className="relative w-full shrink-0 overflow-hidden rounded-xl shadow-2xl before:absolute before:inset-0 before:z-10 sm:-mt-0 sm:w-1/2 md:-ml-[35%] md:w-8/12">
      <Image
        title={title}
        alt={title}
        src={imgSrc}
        width={1920}
        height={926}
        placeholder="blur"
        blurDataURL={imgSrc}
        quality={50}
        className="backdrop-blur-xl transition-all duration-300 lg:group-hover:scale-110"
      />
    </div>

    <div className="flex flex-col justify-start gap-3">
      <h1 className="font-bold capitalize text-gray-900 dark:text-gray-100 ">
        {title}
      </h1>
      <p className="truncate-2 text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>

      <div className="flex flex-wrap items-center gap-1">
        {tags.map((name) => {
          return (
            <span
              key={name}
              className="bg-gray-100 font-semibold text-gray-900 px-2 py-1 text-xs dark:text-gray-100 dark:bg-gray-800 rounded"
            >
              {name}
            </span>
          );
        })}
      </div>

      <div className="mt-auto flex w-fit items-center gap-4 p-2">
        <Link
          title="Source Code on GitHub"
          target="_blank"
          rel="noopener noreferrer"
          href={githubRepo}
          className="text-gray-500 dark:hover:text-white hover:text-slate-950"
        >
          <BsGithub className="h-6 w-6 transition-all hover:scale-110 active:scale-90" />
        </Link>

        {livePreview && (
          <Link
            title="Live Preview"
            target="_blank"
            rel="noopener noreferrer"
            href={livePreview}
            className="text-gray-500 dark:hover:text-white hover:text-slate-950"
          >
            <MdOutlineLink className="h-6 w-6 transition-all hover:scale-110 active:scale-90" />
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default ProjectCard;
