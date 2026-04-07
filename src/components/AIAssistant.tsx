"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm the DBot AI assistant. How can I help you today? You can ask me about our services, products, or how to get in touch."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to state
    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: userMessage }
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting right now. Please try again later or reach out to us directly at [darshana@dbot.com](mailto:darshana@dbot.com)."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, originX: 1, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 flex flex-col w-[360px] sm:w-[420px] h-[600px] max-h-[85vh] bg-black/95 backdrop-blur-xl border border-gray-800/80 rounded-2xl shadow-2xl shadow-blue-900/20 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide">DBot Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-[11px] text-gray-400 font-medium">Online & ready to help</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 transition-colors rounded-full hover:text-white hover:bg-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-black flex flex-col gap-5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 border border-gray-800 mt-1 shadow-sm">
                      <Bot size={16} className="text-blue-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] p-3.5 px-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-[4px] shadow-md shadow-blue-600/20'
                        : 'bg-gray-900/80 backdrop-blur-sm text-gray-200 rounded-tl-[4px] border border-gray-800/60 shadow-sm leading-relaxed'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <p className="text-sm font-medium whitespace-pre-wrap">{message.content}</p>
                    ) : (
                      <div className="text-[13.5px] prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-white prose-ul:my-2 prose-li:my-0.5">
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            a: ({ node, ...props }) => <a {...props} className="text-blue-400 font-medium hover:underline transition-colors" target="_blank" rel="noopener noreferrer" />
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 border border-gray-800 mt-1">
                    <Bot size={16} className="text-blue-400" />
                  </div>
                  <div className="bg-gray-900/80 backdrop-blur-sm text-gray-300 rounded-2xl rounded-tl-[4px] p-3.5 px-4 border border-gray-800/60 flex items-center gap-3">
                    <Loader2 size={16} className="animate-spin text-blue-500" />
                    <span className="text-xs font-medium tracking-wide">Assistant is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="p-3 bg-black border-t border-gray-800"
            >
              <div className="relative flex items-center group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full py-3.5 pl-5 pr-14 text-sm text-white bg-gray-900/50 border border-gray-800 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 transition-all shadow-inner"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 p-2.5 text-white bg-blue-600 rounded-full hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 disabled:cursor-not-allowed transition-all shadow-md"
                >
                  <Send size={16} className="translate-x-[1px] translate-y-[1px]" />
                </button>
              </div>
              <div className="text-center mt-2.5 mb-0.5">
                <p className="text-[10px] text-gray-500 font-medium tracking-wide">Powered by DBot AI</p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed z-[9999] flex items-center justify-center w-14 h-14 text-white bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] bottom-6 right-6 hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden group cursor-pointer"
          aria-label="Toggle AI Assistant Chat"
        >
          {/* Subtle gleam effect */}
          <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-white/20 group-hover:animate-[gleam_1s_ease-in-out_forwards]"></div>
          <MessageSquare size={24} className="relative z-10 pointer-events-none" />
        </button>
      )}
    </>
  );
}
