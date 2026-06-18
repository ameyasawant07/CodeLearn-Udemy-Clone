'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Award, Printer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CertificatePage() {
    const params = useParams();
    const router = useRouter();
    const [course, setCourse] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        // Fetch user and course data securely
        Promise.all([
            fetch('/api/user', { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
            fetch(`/api/courses/${params.courseId}`).then(res => res.json())
        ]).then(([userData, courseData]) => {
            if (!userData.user || !courseData.course) {
                router.push('/dashboard');
                return;
            }

            // Verify completion
            const isComplete = userData.user.completedCourses?.some((c: any) => c.courseId === params.courseId);
            if (!isComplete) {
                alert("You must complete the course to view this certificate.");
                router.push('/dashboard');
                return;
            }

            setUser(userData.user);
            setCourse(courseData.course);
            setLoading(false);
        }).catch(() => {
            router.push('/dashboard');
        });
    }, [params.courseId, router]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Generating Certificate...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
            {/* Navigation - Hidden when printing */}
            <div className="w-full max-w-4xl mb-8 flex justify-between items-center print:hidden">
                <Link href="/dashboard" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
                </Link>
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-lg"
                >
                    <Printer size={20} /> Print Certificate
                </button>
            </div>

            {/* Certificate Container */}
            <div className="w-full max-w-[1100px] aspect-[1.414/1] bg-white text-black p-12 relative shadow-2xl overflow-hidden print:shadow-none print:w-full print:h-screen print:absolute print:top-0 print:left-0">

                {/* Decorative Border */}
                <div className="absolute inset-4 border-[12px] border-double border-indigo-900 pointer-events-none"></div>
                <div className="absolute inset-8 border-[2px] border-indigo-900 pointer-events-none"></div>

                {/* Content */}
                <div className="h-full flex flex-col items-center justify-center text-center relative z-10 px-16">

                    {/* Header / Logo */}
                    <div className="mb-12">
                        <div className="w-24 h-24 bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                            <Award size={48} />
                        </div>
                        <h1 className="text-6xl font-serif text-indigo-900 font-bold tracking-wide uppercase">Certificate</h1>
                        <p className="text-2xl text-gray-600 font-serif italic mt-2">of completion</p>
                    </div>

                    {/* User Name */}
                    <div className="mb-8 w-full">
                        <p className="text-xl text-gray-500 uppercase tracking-widest mb-2">This is to certify that</p>
                        <h2 className="text-5xl font-bold text-gray-900 border-b-2 border-gray-300 pb-4 mx-12 font-serif">
                            {user.name}
                        </h2>
                    </div>

                    {/* Course Title */}
                    <div className="mb-12 w-full">
                        <p className="text-xl text-gray-500 uppercase tracking-widest mb-2">Has successfully completed the course</p>
                        <h3 className="text-4xl font-bold text-indigo-800 font-serif">
                            {course.title}
                        </h3>
                    </div>

                    {/* Footer / Signatures */}
                    <div className="w-full flex justify-between items-end mt-auto px-12">
                        <div className="text-center">
                            <p className="text-lg font-bold text-gray-900 border-t-2 border-gray-400 pt-2 px-8">
                                {new Date().toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Date</p>
                        </div>

                        <div className="text-center">
                            <div className="font-dancing-script text-3xl text-indigo-900 mb-1">CodeLearn Team</div>
                            <p className="text-lg font-bold text-gray-900 border-t-2 border-gray-400 pt-2 px-8">
                                CodeLearn
                            </p>
                            <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Instructor</p>
                        </div>
                    </div>

                    <p className="absolute bottom-6 text-xs text-gray-400">
                        Certificate ID: {course.id}-{user.id.slice(-6)}
                    </p>
                </div>
            </div>

            <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0;
          }
          body {
            background: white;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
        </div>
    );
}
