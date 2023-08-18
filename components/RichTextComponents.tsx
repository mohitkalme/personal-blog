import Image from "next/image";
import urlFor from "@/lib/utils/urlFor";
import { getImageDimensions } from "@sanity/asset-utils";

export const RichTextComponents = {
  types: {
    code: ({ value }: any) => (
      <pre data-language={value.language}>
        <code>{value.code}</code>
      </pre>
    ),
    image: ({ value }: any) => {
      const { width, height } = getImageDimensions(value);

      return (
        <Image
          src={urlFor(value).url()}
          alt="Blog Post Image"
          width={width}
          height={height}
        />
      );
    },
  },
};
