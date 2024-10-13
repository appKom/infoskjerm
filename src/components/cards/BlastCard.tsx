import { useEffect, useRef, useState } from 'react';
import { BlastType } from "../../lib/types";
import { formatSlackDate } from "../../lib/date";
import { BaseCard } from "./BaseCard";
import { useFormattedSlackText } from '../../lib/text';

export const BlastCard = ({ blast }: { blast: BlastType }) => {
  const { headerLine, formattedText } = useFormattedSlackText(blast.text);
  const { contentRef, isOverflowing } = useIsOverflowing(formattedText);

  return (
    <BaseCard width={1000}>
      <div className="flex items-center w-full gap-4 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <img
          className="w-12 h-12 rounded-full"
          src={blast.author_image}
          alt={blast.author}
        />
        <div className="font-medium dark:text-white">
          <div>{blast.author}</div>
          <div className="text-gray-500 dark:text-gray-400">
            {formatSlackDate(blast.date)}
          </div>
        </div>
      </div>
      <div className="mx-4 mt-3 mb-2 text-2xl font-bold dark:text-white" dangerouslySetInnerHTML={{ __html: headerLine }} />
      <div
        ref={contentRef}
        className="mx-4 mb-2 text-lg break-words text-ellipsis dark:text-white line-clamp-3"
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
      {isOverflowing && (
        <div className="px-4 pt-0 pb-2 text-gray-500 dark:text-white">
          Les resten på <span className="text-blue-500">#korktavla</span>
        </div>
      )}
    </BaseCard>
  );
};

const useIsOverflowing = (text: string) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const contentEl = contentRef.current;

    if (contentEl) setIsOverflowing (contentEl.scrollHeight > contentEl.clientHeight);
  }, [text]);

  return { contentRef, isOverflowing };
};
