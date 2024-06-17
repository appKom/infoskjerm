export const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10 animate-pulse">
      <img
        src="/online/online_logo_blue.svg"
        width={300}
        height={100}
        alt="Online logo"
      />
      <div className="text-xl dark:text-white">Det har skjedd en feil, helt sikkert dotkom...</div>
    </div>
  );
};