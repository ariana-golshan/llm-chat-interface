import { useRef, useState } from "react";
import ModelDropdown from "./ModelDropdown";

function Header({ chatStrted, selectedModel, setSelectedModel }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const models = ["GPT-4", "GPT-3.5", "gpt-4.1"];

  return (
    <header>
      {/* Desktop header */}{" "}
      <div className="hidden md:flex bg-transparent px-2 py-1.5 justify-between w-full items-center pl-16 fixed top-0 z-10">
        <button className="flex items-center justify-center gap-2 text-lg hover:bg-black/10 duration-200 px-2.5 py-1.5 rounded-lg">
          <h3>ChatGPT</h3>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#9E9E9E"
              className="size-[18px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </button>

        {chatStrted && (
          <div className="flex items-center justify-center gap-1 px-2">
            {" "}
            <button className="flex justify-center items-center gap-1.5 hover:bg-gray-200/80 py-2 px-3 duration-200 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
              <p className="font-semibold text-sm">Share</p>
            </button>
            <button className="hover:bg-gray-200/80 p-1.5 duration-200 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      {/* Tablet/Mobile header */}
      <div className="md:hidden flex w-full justify-between items-center fixed top-0 z-10 px-2 py-1.5 bg-white border-b-2 border-gray-200/60">
        <button className="flex items-center justify-center hover:bg-black/5 w-10 h-10 p-2.5 rounded-lg duration-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </button>
        <div className="relative inline-block">
          <button
            ref={buttonRef}
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center gap-1 text-lg hover:bg-black/10 duration-200 px-2.5 py-1.5 rounded-lg"
          >
            <h3>{selectedModel}</h3>
            <div>
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
            </div>
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
        <div className="hover:bg-black/5 w-10 h-10 p-2.5 rounded-lg duration-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}

export default Header;
