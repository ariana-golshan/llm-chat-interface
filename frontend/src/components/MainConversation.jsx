import { useState, useEffect, useRef } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

function MainConversation({
  chatStarted,
  setChatStarted,
  selectedModel,
  chatId,
  messages,
  setMessages,
}) {
  const [inputValue, setInputValue] = useState("");
  // const [messages, setMessages] = useState([]);
  // const [chatStarted, setChatStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  // const [chatId] = useState(() => "chat_" + Date.now());

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    if (!chatStarted) setChatStarted(true);

    const userMessage = inputValue;

    // Add user message to chat
    const userMessages = [
      ...messages,
      { id: Date.now(), text: inputValue, sender: "user" },
    ];
    setMessages(userMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const resp = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          model: selectedModel,
          chat_id: chatId,
        }),
      });

      if (!resp.ok) {
        setIsLoading(false);
        throw new Error(`HTTP error! status: ${resp.status}`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullText = "";
      let firstChunk = true;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;

          if (firstChunk) {
            setIsLoading(false);
            firstChunk = false;
          }

          const streamingMessages = [
            ...userMessages,
            {
              id: "streaming",
              text: fullText,
              sender: "bot",
            },
          ];
          setMessages(streamingMessages);

          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }, 50);
        }
      }

      // Finalize the streaming message with a permanent ID
      const finalMessages = [
        ...userMessages,
        {
          id: Date.now() + 1,
          text: fullText,
          sender: "bot",
        },
      ];
      setMessages(finalMessages);

      // const data = await resp.json();
      // console.log(data.reply);

      // setMessages((prev) => [
      //   ...prev,
      //   {
      //     id: Date.now() + 1,
      //     text: data.reply || "No response from bot.",
      //     sender: "bot",
      //   },
      // ]);

      // const reader = resp.body.getReader();
      // const decoder = new TextDecoder();
      // let botMessage = "";

      // while (true) {
      //   const { done, value } = await reader.read();
      //   if (done) break;

      //   // Decode chunk to string
      //   const chunk = decoder.decode(value, { stream: true });
      //   botMessage += chunk;

      //   // Update messages as streaming happens
      //   setMessages((prev) => {
      //     const last = prev[prev.length - 1];
      //     if (last?.sender === "bot") {
      //       // Update ongoing bot message
      //       return [...prev.slice(0, -1), { ...last, text: botMessage }];
      //     } else {
      //       // Add first bot message
      //       return [
      //         ...prev,
      //         { id: Date.now() + 1, text: botMessage, sender: "bot" },
      //       ];
      //     }
      //   });
      // }

      // // setMessages((prev) => [
      // //   ...prev,
      // //   {
      // //     id: Date.now() + 1,
      // //     text: data.reply || "No response from bot.",
      // //     sender: "bot",
      // //   },
      // // ]);

      // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error(error);
      const errorMessages = [
        ...userMessages,
        {
          id: Date.now() + 1,
          text: "Error connecting to backend.",
          sender: "bot",
        },
      ];
      setMessages(errorMessages);
    } finally {
      setIsLoading(false);
    }

    // setMessages((prev) => [
    //   ...prev,
    //   { id: Date.now(), text: inputValue, sender: "user" },
    // ]);
    // setInputValue("");
    // setIsLoading(true);

    // setTimeout(() => {
    //   setMessages((prev) => [
    //     ...prev,
    //     {
    //       id: Date.now() + 1,
    //       text: "Sorry, I can't answer properly (YET!)",
    //       sender: "bot",
    //     },
    //   ]);
    //   setIsLoading(false);
    // }, 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {!chatStarted ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="font-semibold text-3xl mb-10 text-[#263238]">
            How can I help you today?
          </h1>
          <div className="w-full px-5">
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
              isLoading={isLoading}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto">
            <MessageList messages={messages} isLoading={isLoading} />
            <div ref={messagesEndRef} />
          </div>

          <div className="flex-shrink-0 p-5 pt-1 bg-white">
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
              isLoading={isLoading}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default MainConversation;
