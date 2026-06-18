'use client';

import { Navbar } from '@/components/Navbar';
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Timer, RotateCcw, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { mockQuestions } from '@/lib/mockQuestions';

// Utility to shuffle array
const shuffleArray = (array: any[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

export default function TestPage() {
    const params = useParams();
    const topicParam = (params.topic as string) || '';
    const topicKey = topicParam.toLowerCase();

    // Fallback if topic doesn't exist in our DB, though it should based on landing page links
    const availableTopics = Object.keys(mockQuestions);
    const isValidTopic = availableTopics.includes(topicKey);

    const formatTopicName = (key: string) => {
        if (key === 'cpp') return 'C++';
        if (key === 'nodejs') return 'Node.js';
        if (key === 'javascript') return 'JavaScript';
        if (key === 'sql') return 'SQL';
        return key.charAt(0).toUpperCase() + key.slice(1);
    };

    const displayTopic = isValidTopic ? formatTopicName(topicKey) : 'General';

    // State management
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

    useEffect(() => {
        if (isValidTopic) {
            // Get questions for the topic and shuffle them
            const topicQuestions = mockQuestions[topicKey];
            const randomized = shuffleArray(topicQuestions).slice(0, 10);
            setQuestions(randomized);
        } else {
            setQuestions([]);
        }
    }, [topicKey, isValidTopic]);

    // Timer logic
    useEffect(() => {
        if (!isSubmitted && timeLeft > 0 && questions.length > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !isSubmitted) {
            handleSubmit();
        }
    }, [timeLeft, isSubmitted, questions.length]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleOptionSelect = (optionIndex: number) => {
        if (isSubmitted) return;
        setSelectedAnswers(prev => ({
            ...prev,
            [currentQuestion]: optionIndex
        }));
    };

    const handleSubmit = () => {
        let newScore = 0;
        questions.forEach((q, index) => {
            if (selectedAnswers[index] === q.correct) {
                newScore++;
            }
        });
        setScore(newScore);
        setIsSubmitted(true);
    };

    const resetTest = () => {
        if (isValidTopic) {
            const topicQuestions = mockQuestions[topicKey];
            const randomized = shuffleArray(topicQuestions).slice(0, 10);
            setQuestions(randomized);
        }
        setIsSubmitted(false);
        setScore(0);
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setTimeLeft(600);
    };

    // Loading State
    if (questions.length === 0 && isValidTopic) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
                <div className="text-xl">Loading test...</div>
            </div>
        );
    }

    // Invalid Topic State
    if (!isValidTopic) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-500">
                <Navbar />
                <div className="pt-32 text-center text-gray-900 dark:text-white">
                    <h1 className="text-3xl font-bold mb-4">Topic Not Found</h1>
                    <Link href="/mock-tests" className="text-blue-600 hover:underline">Return to Mock Tests</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-500">
            <Navbar />

            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="mb-8 flex justify-between items-center bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {displayTopic} Mock Test
                        </h1>
                        <p className="text-sm text-gray-500">
                            Question {currentQuestion + 1} of {questions.length}
                        </p>
                    </div>

                    {!isSubmitted && (
                        <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-blue-600'}`}>
                            <Timer size={24} />
                            {formatTime(timeLeft)}
                        </div>
                    )}

                    {isSubmitted && (
                        <div className="flex items-center gap-2">
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Final Score</p>
                                <p className="text-2xl font-bold text-blue-600">{Math.round((score / questions.length) * 100)}%</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 min-h-[400px] flex flex-col">
                    <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-6">
                        {currentQuestion + 1}. {questions[currentQuestion].question}
                    </h2>

                    <div className="space-y-4 flex-1">
                        {questions[currentQuestion].options.map((option: string, idx: number) => {
                            const isSelected = selectedAnswers[currentQuestion] === idx;
                            const isCorrect = questions[currentQuestion].correct === idx;

                            let optionClass = "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800";

                            if (isSubmitted) {
                                if (isCorrect) optionClass = "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-400";
                                else if (isSelected) optionClass = "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:text-red-400";
                            } else {
                                if (isSelected) optionClass = "bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionSelect(idx)}
                                    disabled={isSubmitted}
                                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${optionClass} flex items-center justify-between`}
                                >
                                    <span>{option}</span>
                                    {isSubmitted && isCorrect && <CheckCircle className="text-green-600" size={20} />}
                                    {isSubmitted && isSelected && !isCorrect && <XCircle className="text-red-500" size={20} />}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-100 dark:border-gray-800">
                        <button
                            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                            disabled={currentQuestion === 0}
                            className={`px-6 py-2 rounded-lg font-medium transition-colors ${currentQuestion === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
                        >
                            Previous
                        </button>

                        {currentQuestion < questions.length - 1 ? (
                            <button
                                onClick={() => setCurrentQuestion(prev => prev + 1)}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                Next
                                <ArrowRight size={18} />
                            </button>
                        ) : !isSubmitted ? (
                            <button
                                onClick={handleSubmit}
                                className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 transition-colors font-bold shadow-lg shadow-green-200 dark:shadow-none"
                            >
                                Submit Test
                            </button>
                        ) : (
                            <button
                                onClick={resetTest}
                                className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                            >
                                <RotateCcw size={18} />
                                Retake Test
                            </button>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <Link href="/mock-tests" className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                        Back to All Tests
                    </Link>
                </div>
            </div>
        </div>
    );
}
