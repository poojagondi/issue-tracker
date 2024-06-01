import React from "react";
import "./spinner.css";
const Spinner = () => {
  return (
    <div
      className="inline-block h-4 w-4 animate-spinner-grow rounded-full bg-white align-middle opacity-100 motion-reduce:animate-spinner-grow"
      role="status"
    >
      <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip-rect">
        Loading...
      </span>
    </div>
  );
};

export default Spinner;
