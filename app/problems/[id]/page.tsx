'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Code, Play, CheckCircle } from 'lucide-react';
import Editor from '@monaco-editor/react';


export default function ProblemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [problem, setProblem] = useState<any>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setUser(data.user))
        .catch(() => { });
    }

    fetch(`/api/problems/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.problem) {
          setProblem(data.problem);
          setCode(data.problem.starterCode[language] || data.problem.starterCode.javascript);
        } else {
          router.push('/problems');
        }
      })
      .catch(() => router.push('/problems'));
  }, [params.id, router, language]);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch(`/api/problems/${params.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data.submission);
      } else {
        setResult({
          status: 'runtime_error',
          error: data.error || 'Submission failed',
        });
      }
    } catch (error: any) {
      setResult({
        status: 'runtime_error',
        error: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!problem) {
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
              <Link href="/problems" className="text-gray-300 hover:text-white px-3 py-2">Problems</Link>

            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Problem Description */}
        <div className="w-1/2 overflow-y-auto bg-gray-800 p-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-white">{problem.title}</h1>
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
          </div>

          <div className="text-gray-300 mb-6">
            <p className="text-sm text-gray-400 mb-2">Category: {problem.category}</p>
            <p className="text-sm text-gray-400">Acceptance: {problem.acceptance}%</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm bg-gray-900 p-4 rounded-lg">
              {problem.description}
            </pre>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Test Cases</h2>
            <div className="space-y-4">
              {problem.testCases
                .filter((tc: any) => !tc.isHidden)
                .map((testCase: any, index: number) => (
                  <div key={index} className="bg-gray-900 p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">Example {index + 1}:</p>
                    <p className="text-gray-300 text-sm">
                      <strong>Input:</strong> {JSON.stringify(testCase.input)}
                    </p>
                    <p className="text-gray-300 text-sm">
                      <strong>Output:</strong> {JSON.stringify(testCase.expectedOutput)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="w-1/2 flex flex-col bg-gray-900">
          <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setCode(problem.starterCode[e.target.value] || problem.starterCode.javascript);
              }}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
              }}
            />
          </div>

          {result && (
            <div className="bg-gray-800 p-4 border-t border-gray-700">
              <div className={`p-4 rounded-lg ${result.status === 'accepted'
                ? 'bg-green-900 text-green-200'
                : 'bg-red-900 text-red-200'
                }`}>
                <div className="flex items-center space-x-2 mb-2">
                  {result.status === 'accepted' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span>✗</span>
                  )}
                  <span className="font-semibold">
                    {result.status === 'accepted' ? 'Accepted' : result.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                {result.runtime && (
                  <p className="text-sm">Runtime: {result.runtime}ms</p>
                )}
                {result.memory && (
                  <p className="text-sm">Memory: {result.memory}MB</p>
                )}
                {result.error && (
                  <p className="text-sm mt-2">{result.error}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
