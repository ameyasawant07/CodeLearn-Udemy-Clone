'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Code, Users, Star } from 'lucide-react';
import { TrendingCourses } from '@/components/TrendingCourses';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { Navbar } from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';

export default function Home() {
  const [courses, setCourses] = useState<any[]>([]);
  const [problems, setProblems] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

  useEffect(() => {
    // Fetch courses and problems
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data.courses || []);
        // Check for user token and fetch user data
        const token = localStorage.getItem('token');
        if (token) {
          fetch('/api/user', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => res.json())
            .then(userData => {
              if (userData.user) {
                setUser(userData.user);
                const userCourses = (data.courses || []).filter((c: any) =>
                  userData.user.enrolledCourses?.includes(c.id)
                );
                setEnrolledCourses(userCourses);
              }
            })
            .catch(() => { });
        }
      })
      .catch(() => { });

    fetch('/api/problems')
      .then(res => res.json())
      .then(data => setProblems(data.problems || []))
      .catch(() => { });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Learn Coding. Practice Problems. Master Skills.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The ultimate platform combining Udemy-style courses with LeetCode-style practice problems
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/courses"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center space-x-2"
            >
              <BookOpen className="h-5 w-5" />
              <span>Browse Courses</span>
            </Link>
            <Link
              href="/problems"
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 flex items-center space-x-2"
            >
              <Code className="h-5 w-5" />
              <span>Solve Problems</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-20"></div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <div className="text-3xl font-bold text-gray-900">50K+</div>
          <div className="text-gray-600">Active Students</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <div className="text-3xl font-bold text-gray-900">{courses.length}+</div>
          <div className="text-gray-600">Courses Available</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <Code className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <div className="text-3xl font-bold text-gray-900">{problems.length}+</div>
          <div className="text-gray-600">Coding Problems</div>
        </div>
      </div>

      {enrolledCourses.length > 0 && (
        <div className="mt-20 mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">My Learning</h2>
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-semibold">
              Go to Dashboard →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.slice(0, 6).map(course => {
              const totalLessons = course.lessons?.length || 0;
              const completedCount = user?.completedLessons?.filter(
                (l: any) => l.courseId === course.id
              ).length || 0;
              const progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

              return <CourseCard key={course.id} course={course} progress={progress} isPurchased={true} />;
            })}
          </div>
        </div>
      )}

      {/* Trending Courses */}
      <TrendingCourses enrolledCourseIds={user?.enrolledCourses || []} />

      {/* Featured Courses */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 6).map((course) => {
            const isPurchased = user?.enrolledCourses?.includes(course.id);
            return <CourseCard key={course.id} course={course} isPurchased={isPurchased} />;
          })}
        </div>
      </div>

      {/* Featured Problems */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Problems</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.slice(0, 3).map((problem) => (
            <Link key={problem.id} href={`/problems/${problem.id}`}>
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${problem.difficulty === 'easy'
                      ? 'bg-green-100 text-green-800'
                      : problem.difficulty === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {problem.difficulty}
                  </span>
                  <span className="text-gray-500">{problem.category}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{problem.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{problem.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Acceptance: {problem.acceptance}%</span>
                  <span>{problem.submissions} submissions</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <div className="mt-20 mb-20">
        <FAQ />
      </div>

      {/* Reordered Bottom Sections: Social Proof, Skills, Certificate */}

      {/* Social Proof (moved to bottom) */}
      <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 text-center mb-16">
        <p className="text-gray-600 font-bold mb-6">Top companies choose CodeLearn Business to build in-demand career skills.</p>
        <div className="flex justify-center gap-8 md:gap-16 flex-wrap opacity-60 text-xl font-bold text-gray-800 grayscale">
          <span>Nvidia</span>
          <span>Apple</span>
          <span>Netflix</span>
          <span>Google</span>
          <span>Microsoft</span>
          <span>Amazon</span>
        </div>
      </div>

      {/* Skills Categories (moved to bottom) */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">Explore top skills and certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Web Dev */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Web Development</h3>
            <ul className="space-y-3">
              <li className="text-blue-600 cursor-pointer hover:underline">JavaScript</li>
              <li className="text-blue-600 cursor-pointer hover:underline">React JS</li>
              <li className="text-blue-600 cursor-pointer hover:underline">Angular</li>
              <li className="text-blue-600 cursor-pointer hover:underline">Node.js</li>
            </ul>
          </div>
          {/* IT Cert */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-4 text-gray-900">IT Certifications</h3>
            <ul className="space-y-3">
              <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Amazon AWS</li>
              <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Microsoft Azure</li>
              <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Cisco CCNA</li>
              <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Cybersecurity</li>
            </ul>
          </div>
          {/* Leadership */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Leadership</h3>
            <ul className="space-y-3">
              <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Management Skills</li>
              <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Project Management</li>
              <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Emotional Intelligence</li>
              <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Public Speaking</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Certificate Section */}
      <div className="mb-20 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col md:flex-row">
        <div className="p-12 md:w-1/2 flex flex-col justify-center bg-blue-50">
          <div className="inline-block bg-blue-600 text-white font-bold px-3 py-1 rounded-full text-sm w-fit mb-4">New</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Certified & Rank Up</h2>
          <p className="text-gray-600 text-lg mb-8">
            Demonstrate your coding proficiency with our industry-recognized certificates.
            CodeLearnF certificates are trusted by top tech companies worldwide.
          </p>
          <button className="bg-gray-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition w-fit">
            Start Certification
          </button>
        </div>
        <div className="md:w-1/2 bg-gray-900 flex items-center justify-center p-8">
          <img
            src="/certificate.png"
            alt="CodeLearn Certificate"
            className="max-w-full h-auto shadow-2xl rounded-lg border-4 border-gray-800"
          />
        </div>
      </div>
    </div >
  );
}
