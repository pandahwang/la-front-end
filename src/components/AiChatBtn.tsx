import React, { useState, useEffect, useRef } from "react";

interface Message {
  text: string;
  sender: "user" | "ai";
}

interface AiChatBtnProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const AiChatBtn: React.FC<AiChatBtnProps> = ({
  onClick,
  children,
  className = "",
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "안녕하세요! 무엇을 도와드릴까요?", sender: "ai" },
  ]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleChatDiv = () => {
    isChatOpen ? setIsChatOpen(false) : setIsChatOpen(true);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
      // AI 응답을 시뮬레이션합니다. 실제로는 여기서 AI 응답을 받아와야 합니다.
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "감사합니다. 어떻게 도와드릴까요?", sender: "ai" },
        ]);
      }, 1000);
    }
  };

  return (
    <div>
      {isChatOpen && (
        <div className="bg-white rounded-lg shadow-xl fixed bottom-24 right-10 w-[300px] h-[480px] flex flex-col animate-scale-up-br">
          <div className="bg-yellow-400 p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold text-gray-800">채팅</h3>
            <button
              onClick={handleChatDiv}
              className="text-gray-800 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto bg-gray-100">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* 스크롤을 위한 참조 요소 */}
          </div>
          <div className="p-4 border-t bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="메시지를 입력하세요..."
                className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 transition-colors duration-200"
              >
                전송
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleChatDiv}
        className={`fixed bottom-5 right-5 w-16 h-16 text-3xl bg-yellow-300 text-white rounded-full shadow-lg hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ${className}`}
      >
        💬
      </button>
    </div>
  );
};

export default AiChatBtn;
