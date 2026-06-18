'use client'

import React from 'react'

interface CompletionProgressProps {
    courseId: string
    title: string
    totalLessons: number
    completedLessons: number // mocked
}

export function CompletionProgress({ title, totalLessons, completedLessons }: CompletionProgressProps) {
    const percentage = Math.round((completedLessons / totalLessons) * 100) || 0

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{title}</h4>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {completedLessons} of {totalLessons} lessons completed
            </p>
        </div>
    )
}
