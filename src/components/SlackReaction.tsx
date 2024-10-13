import clsx from 'clsx';
import emoji from 'emoji-dictionary';

export const SlackReaction = ({ url, count, name }: { url: string, count: number, name: string }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1 border rounded-full min-w-max dark:border-gray-700 dark:text-white">
      {
        // If there is a URL, show the image, otherwise show the emoji
        url ? <img src={url} className="max-h-6" alt={name} /> : <EmojiComponent name={name} />
      }
      <div>{count}</div>
    </div>
  )
}
const EmojiComponent = ({ name }: { name: string }) => {
  const emojiChar = emoji.getUnicode(name);

  return (
    <span className={clsx(emojiChar && 'text-sm text-gray-400')}>
      {emojiChar || `:${name}:`}
    </span>
  );
};
