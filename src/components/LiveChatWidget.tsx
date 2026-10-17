import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  X,
  Send,
  Calendar,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  Minimize2,
  Clock,
} from 'lucide-react';
import { SynvoraLogo } from './SynvoraLogo';

interface ChatMessage {
  id: string;
  sender: 'system' | 'user' | 'assistant';
  text: string;
  time: string;
  actions?: {
    label: string;
    action: () => void;
  }[];
}

export const LiveChatWidget: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Hello! Welcome to Synvora IT. How can our engineering and consulting team assist your project today?',
      time: 'Just now',
      actions: [
        {
          label: 'Book Discovery Call (UTC)',
          action: () => {
            navigate('/consultation');
            setIsOpen(false);
          },
        },
        {
          label: 'Estimate Project Cost',
          action: () => {
            navigate('/estimator');
            setIsOpen(false);
          },
        },
        {
          label: 'Explore Services',
          action: () => {
            navigate('/services');
            setIsOpen(false);
          },
        },
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [isOpen, messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Automated smart assistant response for demo environment
    setTimeout(() => {
      setIsTyping(false);

      const lower = trimmed.toLowerCase();
      let replyText =
        'Thank you for reaching out! To discuss specific requirements, architecture, or budgets, our technical leads are ready to review your project brief or meet via an introductory consultation.';
      
      let replyActions = [
        {
          label: 'Book 30-Min Discovery Call (UTC)',
          action: () => {
            navigate('/consultation');
            setIsOpen(false);
          },
        },
        {
          label: 'Submit Project Brief',
          action: () => {
            navigate('/contact');
            setIsOpen(false);
          },
        },
      ];

      if (lower.includes('cost') || lower.includes('price') || lower.includes('budget') || lower.includes('estimate')) {
        replyText =
          'You can use our interactive Project Cost Estimator to get immediate ballparks based on engineering scope, timeline, and platform targets.';
        replyActions = [
          {
            label: 'Open Cost Estimator',
            action: () => {
              navigate('/estimator');
              setIsOpen(false);
            },
          },
          {
            label: 'Contact Advisory Team',
            action: () => {
              navigate('/contact');
              setIsOpen(false);
            },
          },
        ];
      } else if (lower.includes('book') || lower.includes('call') || lower.includes('consult') || lower.includes('meeting')) {
        replyText =
          'You can schedule a technical consultation in UTC right now. Available time slots are dynamically loaded with zero risk of double booking.';
        replyActions = [
          {
            label: 'Schedule in UTC',
            action: () => {
              navigate('/consultation');
              setIsOpen(false);
            },
          },
        ];
      }

      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: replyActions,
      };

      setMessages((prev) => [...prev, botReply]);
    }, 750);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Synvora Live Chat"
          className="pointer-events-auto w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[80vh] mb-3 bg-[#0c122c] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-[#182654] to-[#0d1633] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-[#18C6D9]/15 border border-[#18C6D9]/30 flex items-center justify-center text-[#18C6D9]">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0c122c]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white">Synvora Advisory</h4>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Response time: &lt; 5 mins</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Minimize chat window"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close chat window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notice banner */}
          <div className="px-4 py-1.5 bg-blue-500/10 border-b border-blue-500/15 text-[11px] text-blue-300 flex items-center justify-between">
            <span className="truncate">Demo Support Assistant • Synvora IT</span>
            <span className="text-[10px] text-slate-400">v2.4</span>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#18C6D9] shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#18C6D9] text-[#080D22] font-medium rounded-br-none shadow-md'
                      : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block mt-1 text-[10px] text-right ${
                      msg.sender === 'user' ? 'text-[#080D22]/70' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </span>

                  {/* Optional action buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 space-y-1.5">
                      {msg.actions.map((act, i) => (
                        <button
                          key={i}
                          onClick={act.action}
                          className="w-full text-left text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white flex items-center justify-between group transition-colors"
                        >
                          <span>{act.label}</span>
                          <ExternalLink className="w-3 h-3 text-[#18C6D9] group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-[#18C6D9]/20 border border-[#18C6D9]/30 flex items-center justify-center text-[#18C6D9] shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400 text-[11px]">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#18C6D9]">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#18C6D9] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-[#18C6D9] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-[#18C6D9] rounded-full animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-[#090e24] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about architecture, UTC calls, services..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#18C6D9] transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Send message"
              className="w-8 h-8 rounded-xl bg-[#18C6D9] hover:bg-[#15afc0] disabled:opacity-40 disabled:hover:bg-[#18C6D9] text-[#080D22] flex items-center justify-center transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open live consultation chat'}
        className="pointer-events-auto relative group flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#18C6D9] to-[#2563EB] text-[#080D22] font-semibold text-xs shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      >
        {isOpen ? (
          <>
            <X className="w-5 h-5 text-[#080D22]" />
            <span className="font-bold">Close Chat</span>
          </>
        ) : (
          <>
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-[#080D22]" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </div>
            <span className="font-bold">Chat with Us</span>
          </>
        )}
      </button>
    </div>
  );
};
