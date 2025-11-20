"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Lock } from 'lucide-react';

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
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-200 font-sans">
            {/* Header */}
            <div className="h-14 border-b border-white/10 flex items-center px-4 bg-[#252526]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    Y
                </div>
                <div className="ml-3">
                    <div className="font-bold text-sm">Yohann CHAVANEL</div>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Online
                    </div>
                </div>
                <Lock className="ml-auto w-4 h-4 text-gray-500" />
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                    : 'bg-[#3e3e42] text-gray-100 rounded-tl-none'
                                }`}
                        >
                            {msg.text}
                            <div className="text-[10px] opacity-50 mt-1 text-right">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-[#252526] border-t border-white/10">
                <div className="flex items-center gap-2 bg-[#1e1e1e] rounded-full px-4 py-2 border border-white/10 focus-within:border-blue-500/50 transition-colors">
                    <Paperclip className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-300" />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-500"
                    />
                    <Smile className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-300" />
                    <button type="submit" disabled={!inputValue.trim()} className="text-blue-500 hover:text-blue-400 disabled:opacity-50">
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <div className="text-center mt-2">
                    <div className="inline-flex gap-2">
                        <button type="button" onClick={() => setInputValue("Send me your CV")} className="text-xs bg-[#3e3e42] hover:bg-[#4e4e52] px-2 py-1 rounded-full transition-colors">CV</button>
                        <button type="button" onClick={() => setInputValue("What is your email?")} className="text-xs bg-[#3e3e42] hover:bg-[#4e4e52] px-2 py-1 rounded-full transition-colors">Email</button>
                        <button type="button" onClick={() => setInputValue("LinkedIn profile")} className="text-xs bg-[#3e3e42] hover:bg-[#4e4e52] px-2 py-1 rounded-full transition-colors">LinkedIn</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
