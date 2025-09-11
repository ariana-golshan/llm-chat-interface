import { useState, useMemo, useEffect } from "react";
import MainConversation from "./components/MainConversation";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [chatStarted, setChatStarted] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
  const [chats, setChats] = useState({});
  const [currentChatId, setCurrentChatId] = useState(
    () => "chat_" + Date.now()
  );
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  // const [chatMessages, setChatMessages] = useState([]);
  const backgroundStyle = {
    background: chatStarted && `#FFFFFF`,
    // ? `#FFFFFF`
    // : `linear-gradient(
    //       to bottom,
    //       rgba(255, 192, 203, 0.7),
    //       rgba(255, 165, 0, 0.4),
    //       rgba(255, 215, 0, 0.2),
    //       rgba(173, 216, 230, 0.1)
    //       )`,
  };

  const startNewChat = () => {
    const newChatId = "chat_" + Date.now();

    setCurrentChatId(newChatId);
    setChatStarted(false);
  };

  const switchToChat = (chatId) => {
    setCurrentChatId(chatId);
    setChatStarted(true);
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const currentMessages = useMemo(() => {
    const msgs = chats[currentChatId];
    return Array.isArray(msgs) ? msgs : [];
  }, [chats, currentChatId]);

  const updateMessages = (newMessages) => {
    if (!currentChatId) return;
    if (!Array.isArray(newMessages)) {
      console.error("updateMessages received non-array:", newMessages);
      return;
    }
    setChats((prev) => ({ ...prev, [currentChatId]: newMessages }));
  };

  useEffect(() => {
    const loadChats = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/chats");
        const data = await response.json();
        
        // Convert database format to frontend format
        const chatsData = {};
        for (const chat of data.chats) {
          // Load messages for each chat
          const messagesResponse = await fetch(`http://localhost:8000/api/chats/${chat.id}`);
          const messagesData = await messagesResponse.json();
          chatsData[chat.id] = messagesData.messages;
        }
        
        setChats(chatsData);
      } catch (error) {
        console.error("Failed to load chats:", error);
      }
    };

    loadChats();
  }, []);

  // useEffect(() => {
  //   if (!currentChatId) {
  //     startNewChat();
  //   }
  // }, []);

  return (
    <>
      <div
        className="flex h-screen transition-colors duration-700"
        style={backgroundStyle}
      >
        <Sidebar
          startNewChat={startNewChat}
          chats={chats}
          currentChatId={currentChatId}
          switchToChat={switchToChat}
          expanded={sidebarExpanded}
          toggleSidebar={toggleSidebar}
        />
        <div
          className={`flex flex-col flex-1 h-screen transition-all duration-300 ${
            sidebarExpanded ? "ml-52" : "ml-5"
          }`}
        >
          <Header
            chatStrted={chatStarted}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
          <MainConversation
            chatStarted={chatStarted}
            setChatStarted={setChatStarted}
            selectedModel={selectedModel}
            chatId={currentChatId}
            messages={currentMessages}
            setMessages={updateMessages}
          />
        </div>
      </div>
    </>
  );
}

export default App;
