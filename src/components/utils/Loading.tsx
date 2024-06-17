export const Loading = (props: { text?: string, hideLogo?: boolean}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-10 animate-pulse">
      {!props.hideLogo && (
        <img
          src="/online/online_logo_blue.svg"
          width={300}
          height={100}
          alt="Online logo"
        />
      )}
      <div className="text-xl dark:text-white">{props.text ? props.text : 'Venter på dotkom...'}</div>
    </div>
  );
};
