'use client';

import { Navbar } from '@/components/Navbar';
import { Code, BookOpen, Database, Server, Smartphone, Globe, Terminal, FileCode } from 'lucide-react';
import Link from 'next/link';

const testCategories = [
    {
        id: 'python',
        name: 'Python',
        icon: <FileCode className="w-8 h-8 text-yellow-500" />,
        description: 'Test your knowledge on Python syntax, data structures, and algorithms.',
        questionCount: 20
    },
    {
        id: 'javascript',
        name: 'JavaScript',
        icon: <Code className="w-8 h-8 text-yellow-400" />,
        description: 'Challenge yourself with JS DOM, ES6+, and async programming.',
        questionCount: 20
    },
    {
        id: 'java',
        name: 'Java',
        icon: <BookOpen className="w-8 h-8 text-red-500" />,
        description: 'Core Java concepts, OOP, Streams, and Concurrency.',
        questionCount: 15
    },
    {
        id: 'cpp',
        name: 'C++',
        icon: <Terminal className="w-8 h-8 text-blue-600" />,
        description: 'Pointers, memory management, and STL.',
        questionCount: 15
    },
    {
        id: 'react',
        name: 'React',
        icon: <Code className="w-8 h-8 text-cyan-400" />,
        description: 'Components, Hooks, Context API, and Life Cycle methods.',
        questionCount: 15
    },
    {
        id: 'sql',
        name: 'SQL',
        icon: <Database className="w-8 h-8 text-orange-400" />,
        description: 'Queries, Joins, Normalization, and Indexes.',
        questionCount: 15
    },
    {
        id: 'nodejs',
        name: 'Node.js',
        icon: <Server className="w-8 h-8 text-green-500" />,
        description: 'Event loop, Modules, Express.js, and APIs.',
        questionCount: 15
    },
    {
        id: 'flutter',
        name: 'Flutter',
        icon: <Smartphone className="w-8 h-8 text-blue-400" />,
        description: 'Widgets, State Management, and Dart basics.',
        questionCount: 15
    }
];

export default function MockTestsPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-500">
            <Navbar />

            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Mock Tests
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Select a language or topic to assess your skills.
                        Each test consists of multiple-choice questions designed to simulate real-world interviews.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testCategories.map((category) => (
                        <Link key={category.id} href={`/mock-tests/${category.id}`}>
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                        {category.icon}
                                    </div>
                                    <span className="text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded-full">
                                        {category.questionCount} Questions
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {category.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm flex-1">
                                    {category.description}
                                </p>
                                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group">
                                    Start Test
                                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
