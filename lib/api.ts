export { getDB, saveDB } from './db';
import { getDB, saveDB, User, Course, Problem, Submission } from './db';
import { verifyToken, getUserById } from './auth';

export function addPoints(userId: string, points: number): boolean {
  const db = getDB();
  const user = db.users.find(u => u.id === userId);
  if (!user) return false;

  user.credentialPoints = (user.credentialPoints || 0) + points;
  saveDB(db);
  return true;
}

export function deductPoints(userId: string, points: number): boolean {
  const db = getDB();
  const user = db.users.find(u => u.id === userId);
  if (!user) return false;

  const currentPoints = user.credentialPoints || 0;
  if (currentPoints < points) return false;

  user.credentialPoints = currentPoints - points;
  saveDB(db);
  return true;
}

export function checkAndMarkCourseComplete(user: User, courseId: string, db: any) {
  const course = db.courses.find((c: Course) => c.id === courseId);
  if (!course) return;

  const totalLessons = course.lessons.length;
  const completedLessons = user.completedLessons.filter(l => l.courseId === courseId).length;

  if (completedLessons === totalLessons) {
    if (!user.completedCourses) user.completedCourses = [];

    // Check if already marked complete
    if (!user.completedCourses.some(c => c.courseId === courseId)) {
      user.completedCourses.push({
        courseId,
        completedAt: new Date().toISOString()
      });
      // Award 2 points
      user.credentialPoints = (user.credentialPoints || 0) + 2;
    }
  }
}


export function getCurrentUser(token: string | null): User | null {
  if (!token) return null;
  const decoded = verifyToken(token);
  if (!decoded) return null;
  return getUserById(decoded.userId) || null;
}

export function getAllCourses(): Course[] {
  return getDB().courses;
}

export function getCourseById(id: string): Course | undefined {
  return getDB().courses.find(c => c.id === id);
}

export function enrollInCourse(userId: string, courseId: string): boolean {
  const db = getDB();
  const user = db.users.find(u => u.id === userId);
  const course = db.courses.find(c => c.id === courseId);

  if (!user || !course) return false;
  if (user.enrolledCourses.includes(courseId)) return true;

  user.enrolledCourses.push(courseId);
  course.students++;
  saveDB(db);
  return true;
}

export function getAllProblems(): Problem[] {
  return getDB().problems;
}

export function getProblemById(id: string): Problem | undefined {
  return getDB().problems.find(p => p.id === id);
}

export function submitSolution(
  userId: string,
  problemId: string,
  code: string,
  language: string
): Submission {
  const db = getDB();
  const problem = db.problems.find(p => p.id === problemId);

  if (!problem) {
    throw new Error('Problem not found');
  }

  // Simple code execution simulation
  // In production, use a proper code execution service
  const result = executeCode(code, language, problem.testCases);

  const submission: Submission = {
    id: `sub_${Date.now()}`,
    userId,
    problemId,
    code,
    language,
    status: result.status,
    runtime: result.runtime,
    memory: result.memory,
    submittedAt: new Date().toISOString(),
  };

  db.submissions.push(submission);

  if (result.status === 'accepted') {
    const user = db.users.find(u => u.id === userId);
    if (user && !user.solvedProblems.includes(problemId)) {
      user.solvedProblems.push(problemId);
    }
    problem.submissions++;
  }

  saveDB(db);
  return submission;
}

function executeCode(code: string, language: string, testCases: any[]): {
  status: 'accepted' | 'wrong_answer' | 'runtime_error' | 'time_limit_exceeded';
  runtime: number;
  memory: number;
} {
  // This is a simplified execution - in production, use a sandboxed execution environment
  // For demo purposes, we'll simulate execution

  // Very basic validation - in real app, use proper code execution service
  if (code.trim().length < 10) {
    return {
      status: 'runtime_error',
      runtime: 0,
      memory: 0,
    };
  }

  // Simulate test case execution
  // In production, this would actually run the code
  const passed = Math.random() > 0.3; // 70% pass rate for demo

  return {
    status: passed ? 'accepted' : 'wrong_answer',
    runtime: Math.floor(Math.random() * 100) + 10,
    memory: Math.floor(Math.random() * 50) + 5,
  };
}

export function getUserSubmissions(userId: string): Submission[] {
  return getDB().submissions.filter(s => s.userId === userId);
}

export function getProblemSubmissions(problemId: string): Submission[] {
  return getDB().submissions.filter(s => s.problemId === problemId);
}

export function markLessonComplete(userId: string, courseId: string, lessonId: string): boolean {
  const db = getDB();
  const user = db.users.find(u => u.id === userId);
  if (!user) return false;

  if (!user.completedLessons) {
    user.completedLessons = [];
  }

  // Check if already completed
  const exists = user.completedLessons.some(l => l.courseId === courseId && l.lessonId === lessonId);
  if (!exists) {
    user.completedLessons.push({
      courseId,
      lessonId,
      completedAt: new Date().toISOString()
    });

    checkAndMarkCourseComplete(user, courseId, db);

    saveDB(db);
  }
  return true;
}

export function getCompletedLessons(userId: string, courseId: string): string[] {
  const db = getDB();
  const user = db.users.find(u => u.id === userId);
  if (!user || !user.completedLessons) return [];

  return user.completedLessons
    .filter(l => l.courseId === courseId)
    .map(l => l.lessonId);
}

