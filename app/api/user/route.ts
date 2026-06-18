import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = getCurrentUser(token);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        enrolledCourses: user.enrolledCourses,
        solvedProblems: user.solvedProblems,
        credentialPoints: user.credentialPoints || 0,
        completedLessons: user.completedLessons || [],
        completedCourses: user.completedCourses || [],
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

