"use client";

import { Spinner } from "flowbite-react";

const Loading = () => {
  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-2 absolute w-screen h-screen bg-white top-0 left-0 opacity-95">
      <Spinner aria-label="Loading" size="xl" color="purple" />
      Loading...
    </div>
  );
};

export default Loading;
