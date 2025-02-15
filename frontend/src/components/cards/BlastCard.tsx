import { useEffect, useRef, useState } from "react";
import { BlastType } from "../../lib/types";
import { formatSlackDate } from "../../lib/date";
import { BaseCard } from "./BaseCard";
import { useFormattedSlackText } from "../../lib/text";
import { Badge } from "../Badge";

export const BlastCard = ({ blast }: { blast: BlastType }) => {
  const { headerLine, formattedText } = useFormattedSlackText(blast.text);
  const { contentRef, isOverflowing } = useIsOverflowing(formattedText);

  return (
    <BaseCard width={1000}>
      <div className="flex p-3 gap-4">
        <img
          className="w-12 h-12 rounded-lg object-cover object-top"
          src={blast.authorImage}
          alt={blast.author}
        />
        <div className="flex-grow w-0">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center font-medium dark:text-white">
              <div className="font-medium">{blast.author}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatSlackDate(blast.date)}
              </div>
            </div>
            <Badge color="blue" text={"#" + blast.channelName} />
          </div>
          <div
            className="my-2 text-2xl font-bold dark:text-white"
            dangerouslySetInnerHTML={{ __html: headerLine }}
          />
          <div
            ref={contentRef}
            className="mb-2 text-lg break-words text-ellipsis dark:text-white line-clamp-5"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
          {isOverflowing && (
            <div className="pt-0 pb-2 text-gray-500 dark:text-white">
              Les resten på{" "}
              <span className="text-blue-500">#{blast.channelName}</span>
            </div>
          )}
        </div>
      </div>
    </BaseCard>
  );
};

const useIsOverflowing = (text: string) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const contentEl = contentRef.current;

    // Check if the content is overflowing
    if (contentEl)
      setIsOverflowing(contentEl.scrollHeight > contentEl.clientHeight);
  }, [text]);

  return { contentRef, isOverflowing };
};
