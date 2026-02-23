import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ isAdmin: false, error: 'No auth token provided' });
    }

    const token = authHeader.substring(7);
    
    // Create a client with the user's token to verify and get user info
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    // Verify the token by getting user info
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('Auth error:', authError);
      return NextResponse.json({ isAdmin: false, error: 'Invalid token' });
    }

    const userEmail = user.email || email;
    const userId = user.id;

    console.log('[check-admin] User verified:', { userId, userEmail });

    // Check admin_users table using the user's authenticated session
    // First try by email
    if (userEmail) {
      console.log('[check-admin] Querying by email:', userEmail);
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', userEmail)
        .eq('is_active', true)
        .single();

      console.log('[check-admin] Email query result:', { adminUser, adminError: adminError?.message });

      if (!adminError && adminUser) {
        return NextResponse.json({
          isAdmin: true,
          role: adminUser.role,
          user: {
            id: adminUser.id,
            email: adminUser.email,
            fullName: adminUser.full_name,
            role: adminUser.role,
          },
        });
      }
    }

    // Try by user id (in case admin_users.id references auth.users.id)
    console.log('[check-admin] Querying by id:', userId);
    const { data: adminById, error: adminByIdError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', userId)
      .eq('is_active', true)
      .single();

    console.log('[check-admin] ID query result:', { adminById, adminByIdError: adminByIdError?.message });

    if (!adminByIdError && adminById) {
      return NextResponse.json({
        isAdmin: true,
        role: adminById.role,
        user: {
          id: adminById.id,
          email: adminById.email,
          fullName: adminById.full_name,
          role: adminById.role,
        },
      });
    }

    return NextResponse.json({ isAdmin: false, error: 'Not an admin user', debug: { userEmail, userId } });
  } catch (error) {
    console.error('Check admin error:', error);
    return NextResponse.json({ isAdmin: false, error: 'Failed to check admin status' });
  }
}
