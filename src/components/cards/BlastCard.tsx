import { useEffect, useRef, useState } from 'react';
import { BlastType } from "../../lib/types";
import joypixels from 'emoji-toolkit';
import { formatSlackDate } from "../../lib/date";
import { BaseCard } from "./BaseCard";

export const BlastCard = ({ blast }: { blast: BlastType }) => {
  const { headerLine, formattedText } = useFormattedText(blast.text);
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
      <div className="mx-4 mt-3 mb-2 text-2xl font-bold dark:text-white">{headerLine}</div>
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


const useFormattedText = (text: string) => {
  // Escape HTML entities (e.g. < to &lt;)
  const htmlEscapedText = escapeHtmlEntities(text);

  // Convert shortnames to Unicode emojis
  const unicodeText = joypixels.shortnameToUnicode(htmlEscapedText);

  // Split text into lines
  const lines = unicodeText.split('\n');

  // Extract header line and the remaining lines
  const headerLine = lines[0];
  const restLines = lines.slice(1);

  // Filter out leading empty lines, keep only from the first non-empty line onward
  const filteredLines = restLines.filter((line: string, index: number) =>
    line !== "" || restLines.slice(0, index).some((l: string) => l !== "")
  );

  // Join lines back into a single string, ensuring line breaks are preserved
  const formattedText = filteredLines
    .map((line: string, index: number) => line === "" ? "\n" : line + (index < filteredLines.length - 1 ? "\n" : ""))
    .join('')
    .replace(/\n/g, '<br />');

  return { headerLine, formattedText };
};

const useIsOverflowing = (formattedText: string) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const contentEl = contentRef.current;

    // Check if the content is overflowing
    if (contentEl)setIsOverflowing(contentEl.scrollHeight > contentEl.clientHeight);
  }, [formattedText]);

  return { contentRef, isOverflowing };
};

const escapeHtmlEntities = (str: string) => {
  return str.replace(/[&<>"'/|]/g, function (char) {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      case '/':
        return '&#47;';
      case '|':
        return '&#124;';
      default:
        return char;
    }
  });
}