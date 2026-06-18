'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { TrendingUp, Star, ChevronLeft, ChevronRight } from 'lucide-react'

interface TrendingCoursesProps {
    enrolledCourseIds?: string[];
}

export function TrendingCourses({ enrolledCourseIds = [] }: TrendingCoursesProps) {
    const [trending, setTrending] = useState<any[]>([])
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        fetch('/api/courses')
            .then(res => res.json())
            .then(data => {
                if (data.courses) {
                    // Sort by students count desc
                    const sorted = [...data.courses].sort((a, b) => b.students - a.students)
                    setTrending(sorted.slice(0, 12)) // Show top 12 for sliding
                }
            })
            .catch(() => { })
    }, [])

    useEffect(() => {
        const container = scrollRef.current;
        if (!container || trending.length === 0) return;

        const interval = setInterval(() => {
            const cardWidth = container.children[0]?.clientWidth || 0;
            const gap = 24; // 6 * 4px
            const scrollAmount = cardWidth + gap;

            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [trending]);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const cardWidth = container.children[0]?.clientWidth || 0;
        const gap = 24;
        const scrollAmount = cardWidth + gap;

        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (trending.length === 0) return null

    return (
        <div className="mb-12 relative group">
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-8 w-8 text-red-500" />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trending Courses</h2>
                </div>
                <div className="hidden md:flex gap-2">
                    <button onClick={() => scroll('left')} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition">
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button onClick={() => scroll('right')} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition">
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {trending.map((course) => {
                    const isPurchased = enrolledCourseIds.includes(course.id);

                    return (
                        <div key={course.id} className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-center flex-shrink-0">
                            <Link href={`/courses/${course.id}`}>
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition hover:-translate-y-1 h-full flex flex-col">
                                    <div className="relative">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                                            HOT
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{course.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2 flex-1">{course.description}</p>
                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex items-center space-x-1">
                                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                                <span className="text-gray-700 dark:text-gray-300 font-medium">{course.rating}</span>
                                                <span className="text-gray-500 dark:text-gray-500 text-sm">({course.students.toLocaleString()})</span>
                                            </div>
                                            {isPurchased ? (
                                                <span className="text-green-600 dark:text-green-400 font-bold">Purchased</span>
                                            ) : (
                                                <div className="text-blue-600 dark:text-blue-400 font-bold">${course.price}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
