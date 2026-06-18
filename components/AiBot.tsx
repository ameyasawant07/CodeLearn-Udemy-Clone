'use client'

import React, { useState, useEffect } from 'react'
import { Bot, X, Send } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function AiBot() {
    const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot'; text: string }[]>([
        { role: 'bot', text: 'Hello! I am your AI assistant. How can I help you learn today?' }
    ])

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!message.trim()) return

        const userMsg = message
        setChatHistory(prev => [...prev, { role: 'user', text: userMsg }])
        setMessage('')

        // Real AI response logic via API
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg }),
            });

            if (!res.ok) throw new Error('Failed to fetch response');

            const data = await res.json();
            const response = data.response;

            setChatHistory(prev => [...prev, { role: 'bot', text: response }]);
        } catch (error) {
            console.error(error);
            setChatHistory(prev => [...prev, { role: 'bot', text: "I'm having trouble connecting to my brain right now. Please try again later." }]);
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        // Prevent opening/closing when starting a drag (simple check, can be refined)
        // e.preventDefault(); 

        const element = e.currentTarget.closest('.fixed') as HTMLElement;
        if (!element) return;

        const rect = element.getBoundingClientRect();

        // If position is null (initial state), capture current computed position
        const currentX = position ? position.x : rect.left;
        const currentY = position ? position.y : rect.top;

        setDragOffset({
            x: e.clientX - currentX,
            y: e.clientY - currentY
        });

        // Initialize position if it wasn't set (so it doesn't jump)
        if (!position) {
            setPosition({ x: currentX, y: currentY });
        }

        setIsDragging(true);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                e.preventDefault(); // Prevent selection
                setPosition({
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    // Simple conflict resolution: if we dragged, don't trigger click? 
    // For now, we allow both, but careful with the toggle logic. Be mindful of click vs drag.
    // We can add a "wasDragging" check if needed, but for now simple approach.

    return (
        <div
            className="fixed z-50 flex flex-col items-end"
            style={position ? { left: position.x, top: position.y, bottom: 'auto', right: 'auto' } : { bottom: '1.5rem', right: '1.5rem' }}
        >
            {isOpen && (
                <div className="mb-4 w-80 h-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
                    <div
                        className="bg-primary-600 p-3 flex justify-between items-center text-white cursor-move"
                        onMouseDown={handleMouseDown}
                    >
                        <div className="flex items-center gap-2">
                            <Bot size={20} />
                            <span className="font-semibold">CodeLearn AI</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-primary-700 p-1 rounded" onMouseDown={(e) => e.stopPropagation()}>
                            <X size={16} />
                        </button>
                    </div>

                    {/* ... content ... */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {chatHistory.map((msg, i) => (
                            <div
                                key={i}
                                className={clsx(
                                    "p-3 rounded-lg max-w-[80%] text-sm",
                                    msg.role === 'user'
                                        ? "bg-primary-100 dark:bg-primary-900 ml-auto text-primary-900 dark:text-primary-100"
                                        : "bg-gray-100 dark:bg-gray-800 mr-auto text-gray-800 dark:text-gray-200"
                                )}
                            >
                                {msg.text.split('```').map((part, index) => {
                                    if (index % 2 === 1) {
                                        // Code block
                                        return (
                                            <pre key={index} className="bg-gray-900 text-green-400 p-3 rounded-md text-xs font-mono my-2 overflow-x-auto whitespace-pre-wrap">
                                                <code>{part.replace(/^\w+\n/, '')}</code>
                                            </pre>
                                        );
                                    }
                                    return <span key={index} className="whitespace-pre-wrap">{part}</span>;
                                })}
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSend} className="p-3 border-t dark:border-gray-700 flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ask anything..."
                            className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <button
                            type="submit"
                            className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-md transition-colors icon-hover"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            <button
                onMouseDown={handleMouseDown}
                onClick={(e) => {
                    // Primitive check: if we moved significantly, it's a drag, not a click.
                    // But for simplicity, we let the user manage it. 
                    // To improve, we could timestamp mousedown/up.
                    setIsOpen(!isOpen)
                }}
                className={clsx(
                    "bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center icon-hover cursor-move",
                    isDragging ? "cursor-grabbing" : "cursor-move"
                )}
            >
                <Bot size={28} />
            </button>
        </div>
    )
}
