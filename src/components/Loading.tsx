import React from "react";

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <img
        src="/online/online_logo_blue.svg"
        width={300}
        height={100}
        alt="Online logo"
        className="animate-pulse"
      />
      <div className="text-xl">Venter på dotkom...</div>
    </div>
  );
};