// frontend/app/api/user/update-role/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClerkClient } from '@clerk/backend';
import { getAuth } from '@clerk/nextjs/server';

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { userId: authUserId } = getAuth(req);
    
    if (!authUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { userId, role } = body;

    if (authUserId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (!role || !['VENDOR', 'USER', 'ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const updatedUser = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: role,
        onboarded: true,
      },
    });

    return NextResponse.json({ 
      success: true, 
      user: {
        id: updatedUser.id,
        role: updatedUser.publicMetadata.role,
        onboarded: updatedUser.publicMetadata.onboarded,
      }
    });

  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Failed to update user role' }, 
      { status: 500 }
    );
  }
}