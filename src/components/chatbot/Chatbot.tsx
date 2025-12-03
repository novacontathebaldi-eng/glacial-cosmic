import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { generateAIResponse } from '../../services/ai';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hello! I am the AI assistant for o THEBALDI. How can I help you today?',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            // Call AI service
            const response = await generateAIResponse(userMessage.content, {
                user_id: user?.id,
                user_name: user?.user_metadata?.full_name
            });

            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.content,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);

            // Save conversation to Supabase if user is logged in
            if (user) {
                await supabase.from('chatbot_memories').insert({
                    user_id: user.id,
                    key: 'last_interaction',
                    value: { user: userMessage.content, ai: aiResponse.content },
                    context: 'chat_history'
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: "Sorry, I encountered an error. Please try again.",
                timestamp: new Date()
            }]);
        }
    };

    return (
        <>
            {/* Trigger Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all z-50"
                >
                    <MessageCircle size={24} />
                </button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? 'auto' : '600px',
                            width: isMinimized ? '300px' : '400px'
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-black text-white p-4 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="font-bold">o THEBALDI AI</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-gray-300">
                                    {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="hover:text-gray-300">
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        {!isMinimized && (
                            <>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user'
                                                    ? 'bg-black text-white rounded-br-none'
                                                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                                                    }`}
                                            >
                                                <p className="text-sm">{msg.content}</p>
                                                <span className="text-[10px] opacity-50 mt-1 block">
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="p-4 bg-white border-t border-gray-200">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                            placeholder="Type a message..."
                                            className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-black transition-colors"
                                        />
                                        <button
                                            onClick={handleSend}
                                            disabled={!input.trim() || isTyping}
                                            className="bg-black text-white p-2 rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <Send size={20} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
