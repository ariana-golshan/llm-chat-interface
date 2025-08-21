import MarkdownRenderer from "./MarkdownRenderer";

function MessageList({ messages, isLoading }) {
  return (
    <div className="flex flex-col w-screen md:w-3/4 xl:w-[55%] m-auto p-4 pt-12 space-y-2.5 overflow-y-auto">
      {messages.map((msg) => (
        <div
          key={msg.id}
          dir="auto"
          className={`px-5 py-3 rounded-2xl text-[15px] break-words ${
            msg.sender === "user"
              ? "self-end bg-gray-100"
              : "self-start w-full bot-message"
          } `}
        >
          {msg.sender === "bot" ? (
            <div
              className="prose max-w-full"
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          ) : (
            <span>{msg.text}</span>
          )}
          <MarkdownRenderer content={msg.text} />
        </div>
      ))}

      {isLoading && (
        <div className="self-start max-w-xs p-3 tracking-widest animate-pulse">
          ●●●
        </div>
      )}
    </div>
  );
}

export default MessageList;
