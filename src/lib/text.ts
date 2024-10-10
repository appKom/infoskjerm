import joypixels from 'emoji-toolkit';

export const removeOWFormatting = (text: string) => {
  return text
    // remove * from ***text***
    .replace(/\*{3}([^*]+)\*{3}/g, '$1')
    // remove * from**text**
    .replace(/\*{2}([^*]+)\*{2}/g, '$1')
    // remove _ from _text_
    .replace(/_{1}([^_]+)_{1}/g, '$1')
    // remove ~ from ~~text~~
    .replace(/~{2}([^~]+)~{2}/g, '$1');
};

export const escapeHtmlEntities = (str: string) => {
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

export const useFormattedSlackText = (text: string) => {
  // Escape HTML entities (e.g. < to &lt;)
  const htmlEscapedText = escapeHtmlEntities(text);

  // Convert shortnames to Unicode emojis
  const unicodeText = joypixels.shortnameToUnicode(htmlEscapedText);

  // Remove unsupported emojis
  const cleanText = removeUnsupportedEmojis(unicodeText);

  // Convert *text* to bold and _text_ to italic using regex
  const formattedTextWithStyles = cleanText
    .replace(/\*(.*?)\*/g, '<strong>$1</strong>') // Bold for *text*
    .replace(/_(.*?)_/g, '<em>$1</em>'); // Italic for _text_

  // Split text into lines
  const lines = formattedTextWithStyles.split('\n');

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

export const removeUnsupportedEmojis = (input: string): string => {
  // Regular expression to find text-based emoji like :man-surfing:
  const emojiRegex = /:[a-zA-Z0-9_\-+]+:/g;

  return input.replace(emojiRegex, '');
}