export const BaseCard = ({
  children,
  width,
  showOverflow = false
}: {
  children: React.ReactNode,
  width?: number,
  showOverflow?: boolean
}) => {
  const style = width ? { width: `${width}px` } : undefined;
  const overflowClass = showOverflow ? '' : 'overflow-hidden';

  return (
    <div
      className={`relative ${overflowClass} bg-white flex flex-col border border-gray-200 shadow rounded-xl dark:bg-gray-800 dark:border-gray-700`}
      style={style}
    >
      {children}
    </div>
  );
}
