'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: "What is CodeLearnF Business?",
        answer: "CodeLearnF Business is our enterprise-grade learning platform designed to help organizations upskill their workforce with top-rated courses and real-world coding problems."
    },
    {
        question: "How do I start a course?",
        answer: "Simply browse our catalog, select a course, and click 'Enroll'. Once enrolled, you can access all lessons and materials immediately from your dashboard."
    },
    {
        question: "Can I get a refund?",
        answer: "Yes, we offer a 30-day money-back guarantee for all individual course purchases. If you're not satisfied, contact support for a full refund."
    },
    {
        question: "Do you offer certificates?",
        answer: "Yes! Upon completing any course, you will receive a verifiable digital certificate that you can share on LinkedIn or your resume."
    },
    {
        question: "Is there a mobile app?",
        answer: "Currently, our platform is fully responsive and works great on mobile web. A dedicated mobile app is coming soon!"
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center p-4 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                        >
                            <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                            {openIndex === index ? (
                                <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                        </button>
                        {openIndex === index && (
                            <div className="p-4 border-t border-gray-200 bg-gray-50 text-gray-600">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
