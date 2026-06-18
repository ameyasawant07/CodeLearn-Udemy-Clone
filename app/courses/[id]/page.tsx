'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Code, Play, CheckCircle, Star, Users, Award } from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setUser(data.user);
            setEnrolled(data.user.enrolledCourses?.includes(params.id as string) || false);
          }
        })
        .catch(() => { });
    }

    fetch(`/api/courses/${params.id}`)
      .then(res => res.json())
      .then(data => setCourse(data.course))
      .catch(() => { });
  }, [params.id]);

  const handleEnroll = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch(`/api/courses/${params.id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ couponTier: selectedCoupon }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEnrolled(true);
          window.location.reload();
        }
      })
      .catch(() => { });
  };

  if (!course) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black transition-colors duration-500">
      <nav className="bg-white dark:bg-gray-900 shadow-lg transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">CodeLearn</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/courses" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2">Courses</Link>
              <Link href="/problems" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2">Problems</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-colors">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{course.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{course.description}</p>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">{course.rating}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">{course.students.toLocaleString()} students</span>
                </div>
                <div className="text-blue-600 dark:text-blue-400 font-bold text-2xl">${course.price}</div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Instructor: {course.instructorName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Category: {course.category}</p>
              </div>

              {enrolled ? (
                (() => {
                  const allCompleted = course.lessons.every((lesson: any) =>
                    user?.completedLessons?.some((l: any) => l.courseId === course.id && l.lessonId === lesson.id)
                  );

                  if (allCompleted) {
                    return (
                      <button
                        onClick={() => {
                          const token = localStorage.getItem('token');
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
                        }}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <Award className="h-5 w-5" /> Finish Course
                      </button>
                    );
                  }

                  return (
                    <Link
                      href={`/courses/${course.id}/learn`}
                      className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Continue Learning
                    </Link>
                  );
                })()
              ) : (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="text-indigo-600 dark:text-indigo-400" size={20} />
                      <span className="font-semibold text-gray-900 dark:text-white">Redeem Credential Coupons</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Available Balance: <span className="font-bold text-indigo-600 dark:text-indigo-400">{user?.credentialPoints || 0} CP</span>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { points: 4, discount: 20, label: '20% OFF' },
                        { points: 8, discount: 50, label: '50% OFF' },
                        { points: 12, discount: 70, label: '70% OFF' }
                      ].map((tier) => {
                        const canAfford = (user?.credentialPoints || 0) >= tier.points;
                        const isSelected = selectedCoupon === tier.discount;

                        return (
                          <button
                            key={tier.discount}
                            onClick={() => setSelectedCoupon(isSelected ? 0 : tier.discount)}
                            disabled={!canAfford}
                            className={`relative p-3 rounded-lg border-2 border-dashed transition-all flex flex-col items-center justify-center text-center group
                                        ${!canAfford ? 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800' :
                                isSelected ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' :
                                  'border-gray-300 dark:border-gray-600 hover:border-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800'}
                                    `}
                          >
                            <span className={`text-lg font-bold ${isSelected ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-900 dark:text-white'}`}>
                              {tier.label}
                            </span>
                            <span className="text-xs font-semibold text-indigo-500 bg-indigo-100 dark:bg-indigo-900/40 px-2 py-0.5 rounded-full mt-1">
                              {tier.points} CP
                            </span>
                            {isSelected && <div className="absolute top-[-8px] right-[-8px] bg-indigo-600 text-white rounded-full p-0.5"><CheckCircle size={12} /></div>}
                          </button>
                        );
                      })}
                    </div>

                    {selectedCoupon > 0 && (
                      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded text-center">
                        <p className="text-green-700 dark:text-green-300 font-medium text-sm">
                          Coupon Applied! You save <span className="font-bold">${(course.price * (selectedCoupon / 100)).toFixed(2)}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleEnroll}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    {selectedCoupon > 0
                      ? `Enroll Now - $${(course.price * (1 - selectedCoupon / 100)).toFixed(2)}`
                      : `Enroll Now - $${course.price}`}
                  </button>
                  {selectedCoupon === 0 && user?.credentialPoints >= 4 && (
                    <p className="text-xs text-center text-gray-500">Select a coupon above to verify discount</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="p-8 border-t border-gray-200 dark:border-gray-700">
            {course.videoReviewUrl && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Play className="h-6 w-6 text-red-600 dark:text-red-500" /> Video Review
                </h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={course.videoReviewUrl}
                    title="Course Review"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-[400px] rounded-lg shadow-lg"
                  ></iframe>
                </div>
              </div>
            )}

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Curriculum</h2>
            <div className="space-y-3">
              {course.lessons.map((lesson: any, index: number) => {
                const isCompleted = user?.completedLessons?.some(
                  (l: any) => l.courseId === course.id && l.lessonId === lesson.id
                );

                return (
                  <div
                    key={lesson.id}
                    className={`flex items-center justify-between p-4 rounded-lg transition-colors ${isCompleted ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-700'
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => {
                          if (!enrolled) return;
                          const token = localStorage.getItem('token');
                          fetch('/api/courses/lesson/complete', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ courseId: course.id, lessonId: lesson.id })
                          }).then(res => {
                            if (res.ok) window.location.reload();
                          });
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isCompleted
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-500'
                          }`}
                        disabled={!enrolled}
                        title={enrolled ? "Mark as complete" : "Enroll to start"}
                      >
                        {isCompleted ? <CheckCircle size={18} /> : <span className="font-semibold text-sm">{index + 1}</span>}
                      </button>
                      <div>
                        <h3 className={`font-semibold ${isCompleted ? 'text-green-700 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{lesson.description}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {Math.floor(lesson.duration / 60)} min
                    </div>
                  </div>
                );
              })}
            </div>

            {enrolled && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => {
                    const allCompleted = course.lessons.every((lesson: any) =>
                      user?.completedLessons?.some((l: any) => l.courseId === course.id && l.lessonId === lesson.id)
                    );

                    if (!allCompleted) {
                      alert("Please complete all lessons before finishing the course.");
                      return;
                    }

                    const token = localStorage.getItem('token');
                    fetch(`/api/courses/${course.id}/complete`, {
                      method: 'POST',
                      headers: { 'Authorization': `Bearer ${token}` }
                    })
                      .then(res => res.json())
                      .then(data => {
                        if (data.success) {
                          alert("Congratulations! You have finished the course and earned 2 Credential Points!");
                          router.push('/dashboard');
                        } else {
                          alert("Something went wrong. Please try again.");
                        }
                      });
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
                >
                  <Award className="h-5 w-5" /> Finish Course
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}

