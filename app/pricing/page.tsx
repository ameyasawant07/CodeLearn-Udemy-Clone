'use client'

import React, { useState } from 'react'
import { Check, X } from 'lucide-react'
import Link from 'next/link'

const PLANS = [
    {
        name: "Quarterly",
        price: "29.99",
        period: "3 mon",
        features: ["Access to all courses", "Unlimted problem submissions", "Certificate of completion", "Community support"],
        featured: false
    },
    {
        name: "Annual",
        price: "89.99",
        period: "year",
        features: ["Access to all courses", "Unlimted problem submissions", "Certificate of completion", "Priority 24/7 support", "1-on-1 Mentorship session", "Offline downloads"],
        featured: true
    },
    {
        name: "Semi-Annual",
        price: "49.99",
        period: "6 mon",
        features: ["Access to all courses", "Unlimted problem submissions", "Certificate of completion", "Priority support"],
        featured: false
    }
]

export default function PricingPage() {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('');

    const handleSubscribe = (planName: string) => {
        setSelectedPlan(planName);
        setShowPopup(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">Choose the plan that fits your learning journey</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition duration-300 ${plan.featured ? 'ring-2 ring-blue-500 scale-105 z-10' : ''}`}
                        >
                            {plan.featured && (
                                <div className="bg-blue-500 text-white text-center py-1 text-sm font-bold uppercase tracking-wide">
                                    Most Popular
                                </div>
                            )}
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">${plan.price}</span>
                                    <span className="text-gray-500 dark:text-gray-400 ml-2">/{plan.period}</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                                            <Check className="h-5 w-5 text-green-500 mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handleSubscribe(plan.name)}
                                    className={`w-full py-3 px-6 rounded-lg font-bold transition ${plan.featured
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}>
                                    Get Started
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/" className="text-blue-600 hover:text-blue-800 underline dark:text-blue-400">Back to Home</Link>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Subscription Successful!</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                You have successfully subscribed to the <span className="font-bold text-blue-600 dark:text-blue-400">{selectedPlan}</span> plan. Welcome aboard!
                            </p>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 w-full transition"
                            >
                                Start Learning
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
