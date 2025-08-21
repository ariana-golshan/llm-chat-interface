import { useState, useEffect, useRef } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

function MainConversation({ chatStarted, setChatStarted, selectedModel }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  // const [chatStarted, setChatStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    if (!chatStarted) setChatStarted(true);

    const userMessage = inputValue;

    // Add user message to chat
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: inputValue, sender: "user" },
    ]);
    setInputValue("");
    setIsLoading(true);

    try {
      const resp = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          model: selectedModel,
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

          // نمایش کم‌کم متن در UI
          setMessages((prev) => [
            ...prev.filter((m) => m.id !== "streaming"),
            {
              id: "streaming",
              text: fullText,
              sender: "bot",
            },
          ]);
        }
      }

      // بعد از اتمام استریم، می‌تونی id رو عادی کنیم
      setMessages((prev) =>
        prev.map((m) =>
          m.id === "streaming" ? { ...m, id: Date.now() + 1 } : m
        )
      );

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
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Error connecting to backend.",
          sender: "bot",
        },
      ]);
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
    <div className="flex flex-col flex-1 justify-center items-center pt-4 ">
      {!chatStarted && (
        <h1 className="-translate-y-16 font-semibold text-3xl mb-10 text-[#263238]">
          How can I help you today?
        </h1>
      )}
      {chatStarted && (
        <div className="flex-grow overflow-y-auto w-full">
          <MessageList messages={messages} isLoading={isLoading} />
          <div ref={messagesEndRef} />
        </div>
      )}
      <div
        className={`w-full ${
          chatStarted ? "sticky bottom-0 p-5" : "-translate-y-16"
        }`}
      >
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default MainConversation;
