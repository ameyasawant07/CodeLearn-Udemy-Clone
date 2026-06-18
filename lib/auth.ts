import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getDB, saveDB, User } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

export function createUser(email: string, password: string, name: string, role: 'student' | 'instructor' = 'student'): User {
  const db = getDB();
  const user: User = {
    id: `user_${Date.now()}`,
    email,
    password: hashPassword(password),
    name,
    role,
    enrolledCourses: [],
    solvedProblems: [],
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);
  saveDB(db);
  return user;
}

export function getUserByEmail(email: string): User | undefined {
  const db = getDB();
  return db.users.find(u => u.email === email);
}

export function getUserById(id: string): User | undefined {
  const db = getDB();
  return db.users.find(u => u.id === id);
}

