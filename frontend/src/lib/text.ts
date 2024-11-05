import joypixels from 'emoji-toolkit';
import DOMPurify from 'dompurify';

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

export const useFormattedSlackText = (text: string) => {
  // Sanitize the text to prevent XSS attacks
  const sanitizedText = DOMPurify.sanitize(text);

  // Convert shortnames to Unicode emojis
  const unicodeText = joypixels.shortnameToUnicode(sanitizedText);

  // Remove unsupported emojis
  const cleanText = removeUnsupportedEmojis(unicodeText);

  // Convert *text* to bold and _text_ to italic using regex
  const formattedTextWithStyles = cleanText
    .replace(/\*(.*?)\*/g, '<strong>$1</strong>') // Bold for *text*
    .replace(/_(.*?)_/g, '<em>$1</em>'); // Italic for _text_

  // Remove leading and trailing spaces and line breaks
  const trimmedText = formattedTextWithStyles.trim();

  // Split text into lines
  const lines = trimmedText.split('\n').map(line => line.trim());

  // Extract header line and the remaining lines
  const headerLine = lines[0];
  const restLines = lines.slice(1);

  // Filter out leading empty lines, keep only from the first non-empty line onward
  const filteredLines = restLines.filter((line: string, index: number) =>
    line !== "" || restLines.slice(0, index).some((l: string) => l !== "")
  );

  // Join lines back into a single string
  const formattedText = filteredLines
    .map((line: string, index: number) => {
      // Handle blockquote lines starting with ">"
      if (line.startsWith('>')) {
        const cleanLine = line.substring(1); // Remove the ">" prefix
        return `<blockquote class="px-2 border-s-4 border-gray-300 dark:border-gray-500">${cleanLine}</blockquote>`;
      }

      // Ensure line breaks are preserved
      return line === "" ? "\n" : line + (index < filteredLines.length - 1 ? "\n" : "");
    })
    .join('')
    .replace(/\n/g, '<br />');

  return { headerLine, formattedText };
};

export const removeUnsupportedEmojis = (input: string): string => {
  // Regular expression to find text-based emoji like :man-surfing:
  const emojiRegex = /:[a-zA-Z0-9_\-+]+:/g;

  return input.replace(emojiRegex, '');
}

/*
filteredLines: (16) ['> IDI avholder informasjonsmøte om utveksling for …ormatikk torsdag 7. november kl. 14.15 i aud. R9.', '> Enhet for internasjonale relasjoner vil være til…veksling: Hva, hvor og hvordan. Frister. Stipend.', '>', '> IDIs faglærere som jobber med forhånds- og ettergodkjenning stiller.', '>', '> To IDI-studenter som har vært på utveksling forteller om sine opplevelser.', '> Program:', '> 14 Velkommen', '> 14.20: Om studier i utlandet          ved Thomas Kintel, Enhet for internasjonale relasjoner', '> 14.40: Forhånds- og ettergodkjenning av emner i …Elly Skori-Holm (Spania) og Magnus Sagmo (Brasil)', '> 15.30: Hvordan fylle ut forhåndsgodkjenningsskjemaet               ved Ingeborg Elly Skori-Holm', '> 15.35: Spør en faglig veileder: Faglærere som jo…ndsgodkjenningsskjema på forhånd og vis det frem.', '> 16 Slutt', '> Hjertelig velkommen!', '>', '> Det finnes også en egen kanal for utveksling, så bli med her!']

text.ts:65 formattedText: > IDI avholder informasjonsmøte om utveksling for studenter ved Institutt for datateknologi og informatikk torsdag 7. november kl. 14.15 i aud. R9.<br />> Enhet for internasjonale relasjoner vil være til stede for å informere generelt om utveksling: Hva, hvor og hvordan. Frister. Stipend.<br />><br />> IDIs faglærere som jobber med forhånds- og ettergodkjenning stiller.<br />><br />> To IDI-studenter som har vært på utveksling forteller om sine opplevelser.<br />> Program:<br />> 14 Velkommen<br />> 14.20: Om studier i utlandet          ved Thomas Kintel, Enhet for internasjonale relasjoner<br />> 14.40: Forhånds- og ettergodkjenning av emner i utlandet ved Adrian Stoica og Leif Erik Opland, IDI 15.00: Erfaringer fra studier i utlandet         ved studentene Ingeborg Elly Skori-Holm (Spania) og Magnus Sagmo (Brasil)<br />> 15.30: Hvordan fylle ut forhåndsgodkjenningsskjemaet               ved Ingeborg Elly Skori-Holm<br />> 15.35: Spør en faglig veileder: Faglærere som jobber med forhåndsgodkjenning av emner i utlandet vil være til stede og svare på spørsmål. Fyll gjerne ut forhåndsgodkjenningsskjema på forhånd og vis det frem.<br />> 16 Slutt<br />> Hjertelig velkommen!<br />><br />> Det finnes også en egen kanal for utveksling, så bli med her!

*/