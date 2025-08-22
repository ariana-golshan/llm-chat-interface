import ModelSelector from "./ModelSelector/ModelSelector";

function Header({ chatStrted, selectedModel, setSelectedModel }) {
  const models = [
    "gpt-3.5-turbo",
    "gpt-4",
    "gpt-4-turbo",
    "gpt-4o-mini",
    "gpt-4o",
    "gpt-5",
    "gpt-5-nano",
    "gpt-5-mini",
    "o1-mini",
    "o3-mini",
    "o4-mini",
  ];

  return (
    <header>
      {/* Desktop header */}{" "}
      <div className="hidden md:flex bg-transparent px-2 py-1.5 justify-between w-full items-center pl-16 fixed top-0 z-10">
        <ModelSelector
          models={models}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />

        {chatStrted && (
          // Share and Export button after the chat starts
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
        <ModelSelector
          models={models}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
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
