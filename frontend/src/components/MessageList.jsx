import MarkdownRenderer from "./MarkdownRenderer";

function MessageList({ messages, isLoading }) {
  if (!messages || !Array.isArray(messages)) {
    return <div>No messages available</div>;
  }
  return (
    <div className="flex flex-col w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto p-4 pt-12 space-y-2.5">
      {messages.map((msg) => (
        <div
          key={msg.id}
          dir="auto"
          className={`px-5 py-3 rounded-2xl text-[15px] break-words ${
            msg.sender === "user"
              ? "self-end bg-gray-100 user-message"
              : `self-start w-full bot-message ${
                  /[\u0600-\u06FF]/.test(msg.text) ? "persian-content" : ""
                }`
          } `}
        >
          {msg.sender === "bot" ? (
            msg.text.includes("<table") ? (
              <div
                className="prose max-w-full"
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ) : (
              <MarkdownRenderer content={msg.text} />
            )
          ) : (
            <MarkdownRenderer content={msg.text} />
            // <p>{msg.text}</p>
          )}

          {/* {msg.sender === "bot" ? (
            <div
              className="prose max-w-full"
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          ) : (
            <p>{msg.text}</p>
          )} */}
          {/* <MarkdownRenderer content={msg.text} /> */}
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
