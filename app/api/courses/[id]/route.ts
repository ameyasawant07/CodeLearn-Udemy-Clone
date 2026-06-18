import { NextRequest, NextResponse } from 'next/server';
import { getCourseById, enrollInCourse, getCurrentUser, deductPoints } from '@/lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const course = getCourseById(params.id);
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ course });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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

    const { couponTier } = await request.json().catch(() => ({ couponTier: 0 }));

    const course = getCourseById(params.id);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    let pointsToDeduct = 0;

    // Coupon Logic
    if (couponTier === 20) pointsToDeduct = 4;
    else if (couponTier === 50) pointsToDeduct = 8;
    else if (couponTier === 70) pointsToDeduct = 12;

    if (pointsToDeduct > 0) {
      const pointsAvailable = user.credentialPoints || 0;

      if (pointsAvailable < pointsToDeduct) {
        return NextResponse.json(
          { error: 'Insufficient credential points' },
          { status: 400 }
        );
      }

      const deducted = deductPoints(user.id, pointsToDeduct);
      if (!deducted) {
        return NextResponse.json(
          { error: 'Failed to redeem points' },
          { status: 400 }
        );
      }
    }

    const success = enrollInCourse(user.id, params.id);
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to enroll' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

