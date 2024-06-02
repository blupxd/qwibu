import React from "react";

const Loader = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex flex-col">
          <div className="h-44 rounded-md w-full skeleton" />
          <div className="h-5 w-full skeleton mt-2" />
          <div className="h-10 w-full mt-2 skeleton" />
        </div>
      ))}
    </>
  );
};

export default Loader;
