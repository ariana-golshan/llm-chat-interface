import { useState, useRef } from "react";
import ModelDropdown from "./ModelDropdown";

function ModelSelector({ models, selectedModel, setSelectedModel }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center gap-1 text-lg hover:bg-black/10 duration-200 px-2.5 py-1.5 rounded-lg"
      >
        <h3>{selectedModel}</h3>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#9E9E9E"
          className={`size-[18px] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      <ModelDropdown
        models={models}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        open={open}
        setOpen={setOpen}
        buttonRef={buttonRef}
      />
    </div>
  );
}

export default ModelSelector;
