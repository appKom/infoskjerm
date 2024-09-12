export const SlackReaction = ({url, count}: {url: string, count: number}) => {
  return (
    <div className="flex items-center gap-2 px-2 py-1 border rounded-full w-max dark:border-gray-700 dark:text-white">
      <img src={url} className="max-h-6" />
      <div>{count}</div>
    </div>
  )
}