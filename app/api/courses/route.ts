import { NextResponse } from 'next/server';
import { getAllCourses } from '@/lib/api';

export async function GET() {
  try {
    const courses = getAllCourses();
    return NextResponse.json({ courses });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

