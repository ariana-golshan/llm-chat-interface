import { useState } from "react";
import MainConversation from "./components/MainConversation";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [chatStarted, setChatStarted] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
  // const [chatMessages, setChatMessages] = useState([]);
  const backgroundStyle = {
    background: chatStarted
      ? `#FFFFFF`
      : `linear-gradient(
            to bottom,
            rgba(255, 192, 203, 0.7),
            rgba(255, 165, 0, 0.4),
            rgba(255, 215, 0, 0.2),
            rgba(173, 216, 230, 0.1)
            )`,
  };

  return (
    <>
      <div
        className="flex h-screen transition-colors duration-700"
        style={backgroundStyle}
      >
        <Sidebar />
        <div className="flex flex-col flex-1 h-screen">
          <Header
            chatStrted={chatStarted}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
          <MainConversation
            chatStarted={chatStarted}
            setChatStarted={setChatStarted}
            selectedModel={selectedModel}
          />
        </div>
      </div>
    </>
  );
}

export default App;
