import { NextResponse } from 'next/server';
import { getAllProblems } from '@/lib/api';

export async function GET() {
  try {
    const problems = getAllProblems();
    return NextResponse.json({ problems });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

