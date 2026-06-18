'use client';

import { Navbar } from '@/components/Navbar';
import { Book, Download, ExternalLink, Search } from 'lucide-react';
import { useState } from 'react';

const allBooks = [
    {
        title: 'Python Notes for Professionals',
        description: 'Comprehensive Python notes covering basic syntax to advanced topics like concurrency and data science.',
        url: 'https://books.goalkicker.com/PythonBook/PythonNotesForProfessionals.pdf',
        category: 'Backend',
        image: 'https://image.pollinations.ai/prompt/python%20programming%20book%20cover%20snake%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'JavaScript Notes for Professionals',
        description: 'In-depth guide to JavaScript, including ES6+ features, DOM manipulation, and asynchronous programming.',
        url: 'https://books.goalkicker.com/JavaScriptBook/JavaScriptNotesForProfessionals.pdf',
        category: 'Web',
        image: 'https://image.pollinations.ai/prompt/javascript%20programming%20book%20cover%20yellow%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'Java Notes for Professionals',
        description: 'Detailed Java reference for enterprise development, covering OOP, streams, and concurrency.',
        url: 'https://books.goalkicker.com/JavaBook/JavaNotesForProfessionals.pdf',
        category: 'Backend',
        image: 'https://image.pollinations.ai/prompt/java%20programming%20book%20cover%20coffee%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'C++ Notes for Professionals',
        description: 'Master C++ with notes on STL, templates, memory management, and modern C++ standards.',
        url: 'https://books.goalkicker.com/CPlusPlusBook/CPlusPlusNotesForProfessionals.pdf',
        category: 'System',
        image: 'https://image.pollinations.ai/prompt/cpp%20programming%20book%20cover%20blue%20speed%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'C# Notes for Professionals',
        description: 'Complete guide to C# and .NET framework, perfect for enterprise and game development.',
        url: 'https://books.goalkicker.com/CSharpBook/CSharpNotesForProfessionals.pdf',
        category: 'Backend',
        image: 'https://image.pollinations.ai/prompt/csharp%20programming%20book%20cover%20purple%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'SQL Notes for Professionals',
        description: 'Everything you need to know about SQL queries, joins, optimization, and database design.',
        url: 'https://books.goalkicker.com/SQLBook/SQLNotesForProfessionals.pdf',
        category: 'Database',
        image: 'https://image.pollinations.ai/prompt/sql%20database%20book%20cover%20data%20tables%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'HTML5 Notes for Professionals',
        description: 'Modern HTML5 semantics, forms, and accessibility standards for web developers.',
        url: 'https://books.goalkicker.com/HTML5Book/HTML5NotesForProfessionals.pdf',
        category: 'Web',
        image: 'https://image.pollinations.ai/prompt/html5%20coding%20book%20cover%20orange%20web%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'CSS Notes for Professionals',
        description: 'Advanced CSS techniques including Flexbox, Grid, animations, and responsive design.',
        url: 'https://books.goalkicker.com/CSSBook/CSSNotesForProfessionals.pdf',
        category: 'Web',
        image: 'https://image.pollinations.ai/prompt/css%20design%20book%20cover%20blue%20web%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'React JS Notes for Professionals',
        description: 'Deep dive into React components, hooks, state management, and ecosystem.',
        url: 'https://books.goalkicker.com/ReactJSBook/ReactJSNotesForProfessionals.pdf',
        category: 'Web',
        image: 'https://image.pollinations.ai/prompt/react%20js%20book%20cover%20atom%20physics%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'Angular Notes for Professionals',
        description: 'Comprehensive guide to the Angular framework, TypeScript, and enterprise app structure.',
        url: 'https://books.goalkicker.com/AngularJSBook/AngularJSNotesForProfessionals.pdf',
        category: 'Web',
        image: 'https://image.pollinations.ai/prompt/angular%20framework%20book%20cover%20red%20shield%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'Node.js Notes for Professionals',
        description: 'Server-side JavaScript mastery covering events, streams, file system, and modules.',
        url: 'https://books.goalkicker.com/NodeJSBook/NodeJSNotesForProfessionals.pdf',
        category: 'Backend',
        image: 'https://image.pollinations.ai/prompt/nodejs%20book%20cover%20green%20network%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'TypeScript Notes for Professionals',
        description: 'Typed JavaScript development, interfaces, generics, and strict type checking.',
        url: 'https://books.goalkicker.com/TypeScriptBook/TypeScriptNotesForProfessionals.pdf',
        category: 'Web',
        image: 'https://image.pollinations.ai/prompt/typescript%20book%20cover%20blue%20structure%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'PHP Notes for Professionals',
        description: 'Classic server-side scripting language notes, covering OOP, databases, and security.',
        url: 'https://books.goalkicker.com/PHPBook/PHPNotesForProfessionals.pdf',
        category: 'Backend',
        image: 'https://image.pollinations.ai/prompt/php%20code%20book%20cover%20purple%20elephant%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'Ruby on Rails Notes for Professionals',
        description: 'Full-stack web development with Ruby on Rails, emphasizing convention over configuration.',
        url: 'https://books.goalkicker.com/RubyOnRailsBook/RubyOnRailsNotesForProfessionals.pdf',
        category: 'Backend',
        image: 'https://image.pollinations.ai/prompt/ruby%20rails%20book%20cover%20red%20gem%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'Go Notes for Professionals',
        description: 'The Go programming language guide, focusing on simplicity, concurrency, and performance.',
        url: 'https://books.goalkicker.com/GoBook/GoNotesForProfessionals.pdf',
        category: 'Backend',
        image: 'https://image.pollinations.ai/prompt/golang%20book%20cover%20blue%20gopher%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'Swift Notes for Professionals',
        description: 'iOS development with Swift, covering syntax, UIKit, and modern app architecture.',
        url: 'https://books.goalkicker.com/SwiftBook/SwiftNotesForProfessionals.pdf',
        category: 'Mobile',
        image: 'https://image.pollinations.ai/prompt/swift%20apple%20book%20cover%20orange%20bird%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'Android Notes for Professionals',
        description: 'Android app development concepts, activities, fragments, and material design.',
        url: 'https://books.goalkicker.com/AndroidBook/AndroidNotesForProfessionals.pdf',
        category: 'Mobile',
        image: 'https://image.pollinations.ai/prompt/android%20robot%20book%20cover%20green%20tech%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'Kotlin Notes for Professionals',
        description: 'Modern Android development with Kotlin, featuring coroutines and null safety.',
        url: 'https://books.goalkicker.com/KotlinBook/KotlinNotesForProfessionals.pdf',
        category: 'Mobile',
        image: 'https://image.pollinations.ai/prompt/kotlin%20book%20cover%20geometric%20purple%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'Git Notes for Professionals',
        description: 'Version control mastery: branching, merging, rebasing, and collaborative workflows.',
        url: 'https://books.goalkicker.com/GitBook/GitNotesForProfessionals.pdf',
        category: 'DevOps',
        image: 'https://image.pollinations.ai/prompt/git%20version%20control%20book%20cover%20branch%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'Linux Notes for Professionals',
        description: 'Essential Linux command line, system administration, and shell scripting skills.',
        url: 'https://books.goalkicker.com/LinuxBook/LinuxNotesForProfessionals.pdf',
        category: 'DevOps',
        image: 'https://image.pollinations.ai/prompt/linux%20penguin%20terminal%20book%20cover%20black%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'Bash Notes for Professionals',
        description: 'Shell scripting automation, text processing, and system management with Bash.',
        url: 'https://books.goalkicker.com/BashBook/BashNotesForProfessionals.pdf',
        category: 'DevOps',
        image: 'https://image.pollinations.ai/prompt/bash%20terminal%20script%20book%20cover%20dark%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'PowerShell Notes for Professionals',
        description: 'Windows automation and configuration management using PowerShell.',
        url: 'https://books.goalkicker.com/PowerShellBook/PowerShellNotesForProfessionals.pdf',
        category: 'DevOps',
        image: 'https://image.pollinations.ai/prompt/powershell%20book%20cover%20blue%20console%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'Docker Notes for Professionals',
        description: 'Containerization fundamentals, Dockerfiles, and orchestration basics.',
        url: 'https://books.goalkicker.com/DockerBook/DockerNotesForProfessionals.pdf',
        category: 'DevOps',
        image: 'https://image.pollinations.ai/prompt/docker%20container%20whale%20book%20cover%20blue%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'Kubernetes Notes for Professionals',
        description: 'Container orchestration at scale: pods, services, deployments, and clusters.',
        url: 'https://books.goalkicker.com/KubernetesBook/KubernetesNotesForProfessionals.pdf',
        category: 'DevOps',
        image: 'https://image.pollinations.ai/prompt/kubernetes%20wheel%20book%20cover%20blue%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'MongoDB Notes for Professionals',
        description: 'NoSQL database design, querying, aggregation framework, and indexing.',
        url: 'https://books.goalkicker.com/MongoDBBook/MongoDBNotesForProfessionals.pdf',
        category: 'Database',
        image: 'https://image.pollinations.ai/prompt/mongodb%20leaf%20database%20book%20cover%20green%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'MySQL Notes for Professionals',
        description: 'Relational database management, stored procedures, triggers, and optimization.',
        url: 'https://books.goalkicker.com/MySQLBook/MySQLNotesForProfessionals.pdf',
        category: 'Database',
        image: 'https://image.pollinations.ai/prompt/mysql%20dolphin%20book%20cover%20blue%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'PostgreSQL Notes for Professionals',
        description: 'Advanced object-relational database features, JSON support, and extensions.',
        url: 'https://books.goalkicker.com/PostgreSQLBook/PostgreSQLNotesForProfessionals.pdf',
        category: 'Database',
        image: 'https://image.pollinations.ai/prompt/postgresql%20elephant%20book%20cover%20blue%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'R Notes for Professionals',
        description: 'Statistical computing, data analysis, and visualization using R language.',
        url: 'https://books.goalkicker.com/RBook/RNotesForProfessionals.pdf',
        category: 'Data Science',
        image: 'https://image.pollinations.ai/prompt/r%20statistics%20book%20cover%20blue%20data%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'MATLAB Notes for Professionals',
        description: 'Numerical computing, matrix manipulation, and algorithm implementation.',
        url: 'https://books.goalkicker.com/MATLABBook/MATLABNotesForProfessionals.pdf',
        category: 'Data Science',
        image: 'https://image.pollinations.ai/prompt/matlab%20math%20book%20cover%20orange%20minimalist?width=400&height=600&nologo=true'
    },
    {
        title: 'Excel Notes for Professionals',
        description: 'Advanced spreadsheet formulas, VBA scripting, and data analysis techniques.',
        url: 'https://books.goalkicker.com/ExcelBook/ExcelNotesForProfessionals.pdf',
        category: 'Data Science',
        image: 'https://image.pollinations.ai/prompt/excel%20spreadsheet%20book%20cover%20green%20minimalist?width=400&height=600&nologo=true'
    }
];

export default function EbooksPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBooks = allBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            <Navbar />

            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Free Programming E-books
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                        Download comprehensive notes and guides for popular programming languages.
                        All credits to <a href="https://goalkicker.com/" target="_blank" className="text-blue-500 hover:text-blue-400 underline">GoalKicker.com</a>.
                    </p>

                    <div className="max-w-md mx-auto relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search books (e.g. Python, Web, DevOps)..."
                            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredBooks.map((book, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 flex flex-col"
                        >
                            <div className="h-64 overflow-hidden relative bg-gray-200">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                    {book.category}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1" title={book.title}>
                                    {book.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
                                    {book.description}
                                </p>

                                <a
                                    href={book.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors mt-auto"
                                >
                                    <Download size={18} />
                                    Download PDF
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
