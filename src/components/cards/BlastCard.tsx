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
      <div className='flex px-4 py-3 gap-4'>
        <img
          className="w-12 h-12 rounded-lg"
          src={blast.author_image}
          alt={blast.author}
        />
        <div>
          <div className="flex gap-2 items-center font-medium dark:text-white">
            <div className="font-medium">{blast.author}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {formatSlackDate(blast.date)}
            </div>
          </div>
          <div className="my-2 text-2xl font-bold dark:text-white" dangerouslySetInnerHTML={{ __html: headerLine }} />
          <div
            ref={contentRef}
            className="mb-2 text-lg break-words text-ellipsis dark:text-white line-clamp-5"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
          {isOverflowing && (
            <div className="pt-0 pb-2 text-gray-500 dark:text-white">
              Les resten på <span className="text-blue-500">#korktavla</span>
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
    if (contentEl)setIsOverflowing(contentEl.scrollHeight > contentEl.clientHeight);
  }, [text]);

  return { contentRef, isOverflowing };
};