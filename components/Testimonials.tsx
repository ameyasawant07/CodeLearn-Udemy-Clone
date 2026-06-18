'use client'

import React from 'react'
import { Quote } from 'lucide-react'

const REVIEWS = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Frontend Developer",
        content: "CodeLearnZ completely transformed my career. The courses are top-notch and the practice problems really sharpened my skills.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Data Scientist",
        content: "The AI bot feature is a game changer! Whenever I got stuck, help was just a click away. Highly recommended.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    },
    {
        id: 3,
        name: "Emily Davis",
        role: "Full Stack Engineer",
        content: "I love the detailed problem explanations. It keeps me motivated to code every single day. The community is amazing too.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
    }
]

export function Testimonials() {
    return (
        <div className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">What Our Students Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {REVIEWS.map((review) => (
                        <div key={review.id} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg relative hover:shadow-2xl transition duration-300">
                            <Quote className="absolute top-6 right-6 h-8 w-8 text-blue-100 dark:text-blue-900" />
                            <div className="flex items-center mb-6">
                                <img src={review.avatar} alt={review.name} className="h-12 w-12 rounded-full object-cover mr-4" />
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{review.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 italic">"{review.content}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
