'use client';

import { useMemo } from 'react';

interface ContributionGraphProps {
    submissions: { date: string; count: number }[];
}

export function ContributionGraph({ submissions }: ContributionGraphProps) {
    const data = useMemo(() => {
        const today = new Date();
        const days = [];
        // Generate last 365 days
        for (let i = 364; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const submission = submissions.find(s => s.date === dateStr);
            days.push({
                date: dateStr,
                count: submission ? submission.count : 0,
                dayOfWeek: d.getDay(),
            });
        }
        return days;
    }, [submissions]);

    // Group by weeks for grid layout
    const weeks = useMemo(() => {
        const weeksArray = [];
        let currentWeek: any[] = [];

        data.forEach((day) => {
            currentWeek.push(day);
            if (currentWeek.length === 7) {
                weeksArray.push(currentWeek);
                currentWeek = [];
            }
        });

        // Push remaining if any (though logic above with 365 days might need adjustment for perfect alignment, 
        // CSS grid is forgiving) or better: grouping by actual weeks.

        // Better approach for Horizontal Graph:
        // We want columns to be weeks.
        // We need to pad the start to align with the correct day of week? 
        // GitHub graph starts columns with Sunday (or Mon).

        const result = [];
        let week = new Array(7).fill(null);

        data.forEach((day, index) => {
            // If it's the first day, we might need to place it correctly?
            // Actually simplest way is just rendering a flex row of columns.
        });

        return [];
    }, [data]);

    // Easier rendering approach: CSS Grid with 7 rows.
    // We just render all cells in order, but we need them to flow Column first?
    // CSS Grid `grid-auto-flow: column` works perfectly for this.

    const getColor = (count: number) => {
        if (count === 0) return 'bg-gray-100 dark:bg-black border dark:border-gray-800'; // Black (with border for visibility against dark bg)
        if (count === 1) return 'bg-green-300 dark:bg-green-800';
        if (count <= 3) return 'bg-green-400 dark:bg-green-600';
        if (count <= 5) return 'bg-green-500 dark:bg-green-500';
        return 'bg-green-600 dark:bg-green-400';
    };

    return (
        <div className="w-full overflow-x-auto p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {submissions.reduce((acc, curr) => acc + curr.count, 0)} problems solved in the last year
            </h3>

            <div className="flex gap-1 min-w-max">
                {/* This approach uses weeks as columns */}
                {Array.from({ length: 53 }).map((_, weekIndex) => {
                    // Get days for this week
                    // This is a simplified calculation:
                    // We just slice the data array into chunks of 7 for simplicity, 
                    // or complex date math.
                    // For visual "vibes", slicing works if we start from a Sunday.

                    // Let's use the CSS Grid Auto Flow Column approach on the container instead.
                    return null;
                })}
            </div>

            <div
                className="grid gap-1"
                style={{
                    gridTemplateRows: 'repeat(7, 1fr)',
                    gridAutoFlow: 'column',
                    height: '140px'
                }}
            >
                {data.map((day) => (
                    <div
                        key={day.date}
                        title={`${day.count} submissions on ${day.date}`}
                        className={`w-3 h-3 rounded-sm ${getColor(day.count)} transition-colors`}
                    />
                ))}
            </div>

            <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 justify-end">
                <span>Less</span>
                <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-black border dark:border-gray-800"></div>
                <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-800"></div>
                <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-600"></div>
                <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500"></div>
                <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-400"></div>
                <span>More</span>
            </div>
        </div>
    );
}
