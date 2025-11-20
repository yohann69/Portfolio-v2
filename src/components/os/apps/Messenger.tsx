"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Lock, MoreVertical, Phone, Video, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: number;
    text: React.ReactNode;
    sender: 'user' | 'system';
    timestamp: Date;
}

export default function Messenger() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Connection established. Secure channel active.",
            sender: 'system',
            timestamp: new Date()
        },
        {
            id: 2,
            text: "Hello! I'm Yohann's automated assistant. How can I help you connect with him today?",
            sender: 'system',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showLockInfo, setShowLockInfo] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Auto-reply logic
        setTimeout(() => {
            let replyText: React.ReactNode = "I've received your message. The best way to reach Yohann is via email or LinkedIn.";

            const lowerInput = typeof userMsg.text === 'string' ? userMsg.text.toLowerCase() : '';

            if (lowerInput.includes('email') || lowerInput.includes('mail')) {
                replyText = (
                    <span>
                        You can email him at: <a href="mailto:yohann.chavanel@proton.me" className="text-blue-400 hover:underline">yohann.chavanel@proton.me</a>
                    </span>
                );
            } else if (lowerInput.includes('linkedin')) {
                replyText = (
                    <span>
                        Here is his LinkedIn profile: <a href="https://www.linkedin.com/in/yohann-chavanel/" target="_blank" className="text-blue-400 hover:underline">linkedin.com/in/yohann-chavanel</a>
                    </span>
                );
            } else if (lowerInput.includes('github')) {
                replyText = (
                    <span>
                        Check out his code on GitHub: <a href="https://github.com/yohann69" target="_blank" className="text-blue-400 hover:underline">github.com/yohann69</a>
                    </span>
                );
            } else if (lowerInput.includes('cv') || lowerInput.includes('resume')) {
                replyText = (
                    <span>
                        You can download his CV here: <a href="/CV_2024_Yohann_CHAVANEL.pdf" target="_blank" className="text-blue-400 hover:underline">Download CV</a>
                    </span>
                );
            }

            const systemMsg: Message = {
                id: Date.now() + 1,
                text: replyText,
                sender: 'system',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, systemMsg]);
            setIsTyping(false);
        }, 2000);
    };

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-200 font-sans relative">
            {/* Header */}
            <div className="h-16 border-b border-white/10 flex items-center px-4 bg-[#252526] justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            Y
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#252526]" />
                    </div>
                    <div>
                        <div className="font-bold text-sm text-white">Yohann CHAVANEL</div>
                        <div className="text-xs text-green-400">Active now</div>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-gray-400">
                    <Phone className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                    <Video className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                    <div className="relative">
                        <Lock
                            className="w-4 h-4 hover:text-green-400 cursor-pointer transition-colors"
                            onMouseEnter={() => setShowLockInfo(true)}
                            onMouseLeave={() => setShowLockInfo(false)}
                        />
                        <AnimatePresence>
                            {showLockInfo && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full right-0 mt-2 w-64 bg-black/90 backdrop-blur-md border border-green-500/30 p-3 rounded-lg text-xs text-gray-300 z-50 shadow-xl"
                                >
                                    <div className="flex items-center gap-2 text-green-400 font-bold mb-1">
                                        <Lock className="w-3 h-3" />
                                        End-to-end Encrypted
                                    </div>
                                    Messages are secured with AES-256 encryption. Only you and the system can read them.
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <Info className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#1e1e1e]">
                {messages.map((msg) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                            <div
                                className={`px-4 py-2.5 rounded-2xl text-sm shadow-md ${msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-[#3e3e42] text-gray-100 rounded-bl-none'
                                    }`}
                            >
                                {msg.text}
                            </div>
                            <span className="text-[10px] text-gray-500 mt-1 px-1">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="bg-[#3e3e42] px-4 py-3 rounded-2xl rounded-bl-none flex gap-1">
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#252526] border-t border-white/10 shrink-0">
                <form onSubmit={handleSend} className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-gray-400">
                        <div className="p-2 hover:bg-white/10 rounded-full cursor-pointer transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="flex-1 bg-[#1e1e1e] rounded-full px-4 py-2.5 border border-white/10 focus-within:border-blue-500/50 transition-colors flex items-center gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-500"
                        />
                        <Smile className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-300" />
                    </div>

                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-blue-500/20"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>

                <div className="flex justify-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                    <button type="button" onClick={() => setInputValue("Send me your CV")} className="text-xs bg-[#3e3e42] hover:bg-[#4e4e52] text-gray-300 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap border border-white/5">
                        📄 Send CV
                    </button>
                    <button type="button" onClick={() => setInputValue("What is your email?")} className="text-xs bg-[#3e3e42] hover:bg-[#4e4e52] text-gray-300 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap border border-white/5">
                        📧 Email
                    </button>
                    <button type="button" onClick={() => setInputValue("LinkedIn profile")} className="text-xs bg-[#3e3e42] hover:bg-[#4e4e52] text-gray-300 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap border border-white/5">
                        💼 LinkedIn
                    </button>
                </div>
            </div>
        </div>
    );
}
