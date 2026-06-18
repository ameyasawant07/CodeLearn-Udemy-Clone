import { NextRequest, NextResponse } from 'next/server';
import { markLessonComplete, getCurrentUser } from '@/lib/api';

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = getCurrentUser(token);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { courseId, lessonId } = await request.json();

        if (!courseId || !lessonId) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const success = markLessonComplete(user.id, courseId, lessonId);

        return NextResponse.json({ success });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
