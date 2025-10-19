
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMode, Message } from '../../models';
import { ChatBubbleIcon, CloseIcon, SendIcon } from './icons';

interface ChatbotProps {
  mode: ChatMode;
  className?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ mode, className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initializeChat = () => {
      // const session = createChatSession();
      // setChatSession(session);
      setMessages([
        {
          role: 'model',
          text: 'Hello! How can I assist you today?',
        },
      ]);
    };
    initializeChat();
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (isLoading || !userInput.trim()) return;

    const userMessage: Message = { role: 'user', text: userInput.trim() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput('');
    setIsLoading(true);

    // const botResponseText = await sendMessage(chatSession, userInput.trim());
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay

    const botMessage: Message = { role: 'model', text: "hello" };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setIsLoading(false);
  }, [userInput, isLoading]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const ChatWindow = (
    <div className="flex flex-col h-full w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {mode === 'float' && (
             <header className="bg-slate-800 text-white p-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Shop AI Assistant</h2>
                <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white">
                    <CloseIcon className="h-6 w-6" />
                </button>
            </header>
        )}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl shadow ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-800'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-200 text-slate-800 px-4 py-2 rounded-xl shadow">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4 bg-white">
        <div className="relative">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="w-full pl-4 pr-12 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !userInput.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );

  if (mode === ChatMode.Full) {
    return <div className={`h-full w-full ${className}`}>{ChatWindow}</div>;
  }

  return (
    <div className={`fixed bottom-5 right-5 z-50 ${className}`}>
      {isOpen ? (
        <div className="w-80 h-96 md:w-96 md:h-[500px] shadow-2xl rounded-lg transition-all duration-300 ease-in-out">
            {ChatWindow}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform hover:scale-110"
        >
          <ChatBubbleIcon className="h-8 w-8" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
