function ChatInput({ value, onChange, onSend, isLoading, selectedModel }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend({ model: selectedModel });
    }
  };

  const handleSendClick = () => {
    onSend({ model: selectedModel });
  };

  return (
    <div className="flex items-center justify-between gap-1 max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto border-2 px-3 py-2 rounded-full overflow-hidden bg-white shadow-md border-gray-300 focus-within:border-[#757575]">
      <button className="hover:bg-gray-100 p-1.5 rounded-full duration-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>

      <input
        type="text"
        dir="auto"
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything"
        className="w-full placeholder:text-[17px] focus:outline-none"
      />
      <div className="flex gap-1">
        <button
          onClick={handleSendClick}
          className="hover:bg-gray-100 px-2 py-1.5 rounded-full duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-[22px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
            />
          </svg>
        </button>
        <button
          onClick={handleSendClick}
          className={`${
            isLoading
              ? "p-2.5 bg-gray-100 rounded-full duration-200"
              : value
              ? "bg-black"
              : "bg-gray-200 hover:bg-gray-100"
          } p-1.5 rounded-full duration-200`}
        >
          {isLoading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              strokeWidth={0.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
              />
            </svg>
          ) : value ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="white"
              className="size-5 m-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
          ) : (
            <svg
              className="size-7"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M12 4L12 20"
                  stroke="#000000"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M8 9L8 15"
                  stroke="#000000"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M20 10L20 14"
                  stroke="#000000"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M4 10L4 14"
                  stroke="#000000"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M16 7L16 17"
                  stroke="#000000"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
              </g>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
