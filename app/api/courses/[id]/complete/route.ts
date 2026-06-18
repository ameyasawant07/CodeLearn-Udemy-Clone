
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, checkAndMarkCourseComplete, saveDB, getDB } from '@/lib/api';

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        const db = getDB();
        // Re-fetch user from DB reference to ensure we are modifying the object that will be saved
        const dbUser = db.users.find((u: any) => u.id === user.id);

        if (!dbUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Call the helper to mark completion and award points
        // Note: checkAndMarkCourseComplete modifies the user object in place
        checkAndMarkCourseComplete(dbUser, params.id, db);
        saveDB(db);

        // Check if points were actually awarded (this logic assumes the points increase if successful)
        // A better way would be if checkAndMarkCourseComplete returned a result, but for now we rely on the side effect.
        // We can check if the course is now in completedCourses.
        const isComplete = dbUser.completedCourses?.some((c: any) => c.courseId === params.id);

        return NextResponse.json({
            success: true,
            isComplete,
            credentialPoints: dbUser.credentialPoints
        });

    } catch (error) {
        console.error('Error marking course complete:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
