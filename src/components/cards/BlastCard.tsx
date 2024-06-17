import { BlastType } from "../../lib/types";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import joypixels from 'emoji-toolkit';
import { formatSlackDate } from "../../lib/date";
import { BaseCard } from "./BaseCard";

export const BlastCard = ({ blast }: { blast: BlastType }) => {
  return (
    <BaseCard width={1000}>
      <div className="flex items-center w-full gap-4 px-4 py-3">
        <img
          className="w-10 h-10 rounded-full"
          src={blast.author_image}
          alt={blast.author}
          />
        <div className="font-medium dark:text-white">
          <div>{blast.author}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {formatSlackDate(blast.date)}
          </div>
        </div>
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="p-4 border-t border-gray-200 dark:border-gray-700 dark:text-white" >
        {joypixels.shortnameToUnicode(blast.text)}
      </ReactMarkdown>
    </BaseCard>
  )
}