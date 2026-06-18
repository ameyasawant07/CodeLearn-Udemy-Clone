'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Code, Play, CheckCircle, Award } from 'lucide-react';

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('/api/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (!data.user) {
          router.push('/login');
          return;
        }
        setUser(data.user);

        if (!data.user.enrolledCourses?.includes(params.id as string)) {
          router.push(`/courses/${params.id}`);
          return;
        }

        fetch(`/api/courses/${params.id}`)
          .then(res => res.json())
          .then(courseData => {
            if (courseData.course) {
              setCourse(courseData.course);
              if (courseData.course.lessons.length > 0) {
                setSelectedLesson(courseData.course.lessons[0]);
              }
            } else {
              router.push('/courses');
            }
          })
          .catch(() => router.push('/courses'));
      })
      .catch(() => router.push('/login'));
  }, [params.id, router]);

  if (!course || !selectedLesson) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Code className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">CodeLearn</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2">Dashboard</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-80 bg-gray-800 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold text-white mb-4">{course.title}</h2>
            <div className="space-y-2">
              {course.lessons.map((lesson: any, index: number) => (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`w-full text-left p-3 rounded-lg transition ${selectedLesson.id === lesson.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{lesson.title}</span>
                    <span className="text-xs">
                      {Math.floor(lesson.duration / 60)}m
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gray-900">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-6">{selectedLesson.title}</h1>
            <p className="text-gray-400 mb-8">{selectedLesson.description}</p>

            <div className="bg-black rounded-lg overflow-hidden mb-8">
              <video
                src={selectedLesson.videoUrl}
                controls
                className="w-full"
                style={{ maxHeight: '600px' }}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="flex justify-between">
              {course.lessons.findIndex((l: any) => l.id === selectedLesson.id) > 0 && (
                <button
                  onClick={() => {
                    const index = course.lessons.findIndex((l: any) => l.id === selectedLesson.id);
                    setSelectedLesson(course.lessons[index - 1]);
                  }}
                  className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  Previous Lesson
                </button>
              )}
              {course.lessons.findIndex((l: any) => l.id === selectedLesson.id) < course.lessons.length - 1 ? (
                <button
                  onClick={() => {
                    const token = localStorage.getItem('token');
                    // Mark current lesson as complete
                    fetch('/api/courses/lesson/complete', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      },
                      body: JSON.stringify({ courseId: course.id, lessonId: selectedLesson.id })
                    }).then(() => {
                      // Advance to next lesson
                      const index = course.lessons.findIndex((l: any) => l.id === selectedLesson.id);
                      setSelectedLesson(course.lessons[index + 1]);
                    });
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 ml-auto"
                >
                  Next Lesson
                </button>
              ) : (
                <button
                  onClick={() => {
                    const token = localStorage.getItem('token');

                    // First mark the current (last) lesson as complete to ensure 100%
                    fetch('/api/courses/lesson/complete', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      },
                      body: JSON.stringify({ courseId: course.id, lessonId: selectedLesson.id })
                    }).then(() => {
                      // Then mark the course as complete
                      fetch(`/api/courses/${course.id}/complete`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${token}` }
                      })
                        .then(res => res.json())
                        .then(data => {
                          if (data.success) {
                            setShowModal(true);
                          } else {
                            alert("Something went wrong. Please try again.");
                          }
                        });
                    });
                  }}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 ml-auto flex items-center gap-2"
                >
                  <Award className="h-4 w-4" /> Finish Course
                </button>
              )}
            </div>

            {/* Completion Modal */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center border border-gray-100 dark:border-gray-700 transform transition-all scale-100">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-10 w-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Course 100% Completed!</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    You have successfully completed <strong>{course.title}</strong> and earned <span className="font-bold text-indigo-600 dark:text-indigo-400">2 Credential Points</span>!
                  </p>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

