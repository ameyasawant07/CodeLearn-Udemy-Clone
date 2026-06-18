'use client';

import Link from 'next/link';
import { Star, Users, Award } from 'lucide-react';
import { useState } from 'react';

interface CourseCardProps {
    course: {
        id: string;
        title: string;
        description: string;
        price: number;
        rating: number;
        students: number;
        category: string;
        thumbnail: string;
        lessons: any[];
    };
    progress?: number;
    isPurchased?: boolean;
    children?: React.ReactNode;
}

export default function CourseCard({ course, progress, isPurchased, children }: CourseCardProps) {
    const [imgSrc, setImgSrc] = useState(course.thumbnail);

    return (
        <Link href={`/courses/${course.id}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition hover:-translate-y-1 h-full flex flex-col">
                <img
                    src={imgSrc}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                    onError={() => setImgSrc('https://via.placeholder.com/400x200?text=Course+Image')}
                />
                <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider flex-1 text-left">{course.category}</span>
                        {isPurchased ? (
                            <span className="text-green-600 dark:text-green-400 font-bold text-xs bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">Purchased</span>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                                    <Award size={12} /> Earn 2 Pts
                                </span>
                                <span className="text-blue-600 dark:text-blue-400 font-bold text-base">${course.price}</span>
                            </div>
                        )}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 leading-tight">{course.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2 text-xs line-clamp-2 flex-1 leading-relaxed">{course.description}</p>

                    {typeof progress === 'number' && (
                        <div className="mb-3">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    <div className="mt-auto">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                                    <span className="text-gray-700 dark:text-gray-300">{course.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <span className="text-gray-500 dark:text-gray-400">{course.students.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                            {course.lessons.length} lessons
                        </div>
                        {children && <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">{children}</div>}
                    </div>
                </div>
            </div>
        </Link>
    );
}
