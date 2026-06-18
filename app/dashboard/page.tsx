'use client';

import { Navbar } from '@/components/Navbar';
import { ContributionGraph } from '@/components/ContributionGraph';
import { useState, useEffect } from 'react';
import { Trophy, Target, Clock, Zap, Award, CheckCircle, Play } from 'lucide-react';
import Link from 'next/link';

import CourseCard from '@/components/CourseCard';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [enrolledCoursesList, setEnrolledCoursesList] = useState<any[]>([]);
  const [completedCoursesList, setCompletedCoursesList] = useState<any[]>([]);
  const [stats, setStats] = useState({
    problemsSolved: 0,
    completedCoursesCount: 0,
    currentGoal: '0/50 Solved',
    totalXP: 0,
    studyTime: 0,
    credentialPoints: 0
  });

  useEffect(() => {
    // Fetch user data
    const token = localStorage.getItem('token');
    if (token) {
      Promise.all([
        fetch('/api/user', { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
        fetch('/api/courses').then(res => res.json()),
        fetch('/api/submissions', { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json())
      ])
        .then(([userData, coursesData, submissionsData]) => {
          if (userData.user) {
            setUser(userData.user);

            // Filter and process courses
            const allCourses = coursesData.courses || [];
            const userCourses = allCourses.filter((course: any) =>
              userData.user.enrolledCourses?.includes(course.id)
            );

            const inProgress: any[] = [];
            const completed: any[] = [];

            userCourses.forEach((course: any) => {
              const totalLessons = course.lessons?.length || 0;

              // Count unique completed lessons for this course to ensure accuracy
              const completedLessonIds = new Set(
                userData.user.completedLessons
                  ?.filter((l: any) => String(l.courseId) === String(course.id))
                  .map((l: any) => l.lessonId)
              );

              const completedCount = completedLessonIds.size;

              const progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
              // Add progress property to course object for rendering
              const courseWithProgress = { ...course, progress };

              // Check if 100% progress OR if it is in the completedCourses list (fallback)
              const isMarkedComplete = userData.user.completedCourses?.some(
                (c: any) => String(c.courseId) === String(course.id)
              );

              if (progress >= 100 || isMarkedComplete) {
                completed.push({ ...courseWithProgress, progress: 100 });
              } else {
                inProgress.push(courseWithProgress);
              }
            });

            setEnrolledCoursesList(inProgress);
            setCompletedCoursesList(completed);

            // --- Stats Calculation ---
            const solvedCount = userData.user.solvedProblems?.length || 0;
            const completedLessons = userData.user.completedLessons || [];
            const completedLessonsCount = completedLessons.length;

            // XP: 50 per problem, 20 per lesson
            const xp = (solvedCount * 50) + (completedLessonsCount * 20);

            // Study Time: Sum of durations of completed lessons
            let totalSeconds = 0;
            completedLessons.forEach((cl: any) => {
              const course = allCourses.find((c: any) => c.id === cl.courseId);
              if (course) {
                const lesson = course.lessons.find((l: any) => l.id === cl.lessonId);
                if (lesson) {
                  totalSeconds += lesson.duration || 0;
                }
              }
            });
            const totalHours = Math.round(totalSeconds / 3600);

            setStats({
              problemsSolved: solvedCount,
              completedCoursesCount: completed.length,
              currentGoal: `${solvedCount}/50 Solved`,
              totalXP: xp,
              studyTime: totalHours,
              credentialPoints: userData.user.credentialPoints || 0
            });

            // Process real submissions data
            const userSubmissions = submissionsData.submissions || [];
            const solvedSubmissions = userSubmissions.filter((s: any) => s.status === 'accepted');

            // Map to date counts
            const activityCounts: Record<string, number> = {};

            // Count problem submissions
            solvedSubmissions.forEach((s: any) => {
              const date = s.submittedAt.split('T')[0];
              activityCounts[date] = (activityCounts[date] || 0) + 1;
            });

            // Count completed lessons
            if (userData.user.completedLessons) {
              userData.user.completedLessons.forEach((l: any) => {
                if (l.completedAt) {
                  const date = l.completedAt.split('T')[0];
                  activityCounts[date] = (activityCounts[date] || 0) + 1;
                }
              });
            }

            // Convert to array format expected by graph
            const graphData = Object.keys(activityCounts).map(date => ({
              date,
              count: activityCounts[date]
            }));

            setSubmissions(graphData);
          }
        })
        .catch(err => console.error(err));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-500">
        <Navbar />
        <div className="pt-32 flex justify-center text-gray-500">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-500">
      <Navbar />

      <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-500 mt-2">Here's your coding activity overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <Trophy size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Problems Solved</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.problemsSolved}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                <Target size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Goal</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.currentGoal}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                <Zap size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total XP</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalXP.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Study Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.studyTime}h</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                <Award size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Credential Points</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.credentialPoints}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contribution Graph */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Activity Log</h2>
          <ContributionGraph submissions={submissions} />
        </div>

        {/* Course History / Enrolled Courses */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">My Courses</h2>

          {/* Continue Learning Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <Play size={18} /> Continue Learning
            </h3>
            {enrolledCoursesList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCoursesList.map((course) => (
                  <CourseCard key={course.id} course={course} progress={course.progress} isPurchased={true} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No courses currently in progress.</p>
            )}
          </div>

          {/* Completed Courses Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" /> Completed Courses
            </h3>
            {completedCoursesList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedCoursesList.map((course) => (
                  <CourseCard key={course.id} course={course} progress={100} isPurchased={true}>
                    <Link
                      href={`/certificate/${course.id}`}
                      className="flex items-center justify-center gap-2 w-full py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors font-medium text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Award size={16} /> View Certificate
                    </Link>
                  </CourseCard>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No completed courses yet. Keep going!</p>
            )}
          </div>

          {enrolledCoursesList.length === 0 && completedCoursesList.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 mt-6">
              <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
              <a href="/courses" className="text-blue-600 hover:underline mt-2 inline-block">Browse Courses</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
