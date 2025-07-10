import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createServerSupabaseClient } from '@/lib/supabase';

// GET - Get user's outfits
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = createServerSupabaseClient()

    // Get user from database, create if doesn't exist
    let { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_user_id', userId)
      .single()

    // If user doesn't exist, create them
    if (userError && userError.code === 'PGRST116') {
      console.log('User not found, creating new user for:', userId);
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          clerk_user_id: userId,
          preferences: {}
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creating user:', createError);
        throw createError;
      }

      user = newUser;
    } else if (userError) {
      throw userError
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Failed to get or create user' },
        { status: 500 }
      );
    }

    // Get user's outfits
    const { data: outfits, error: outfitsError } = await supabase
      .from('outfits')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (outfitsError) throw outfitsError

    return NextResponse.json({ outfits });

  } catch (error: any) {
    console.error('Get outfits error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    });
    return NextResponse.json(
      { error: 'Failed to get outfits', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new outfit
export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    console.log('POST /api/outfits - userId:', userId);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      imageUrl,
      cloudinaryPublicId,
      occasion,
      timeOfDay,
      aiAnalysis,
      userRating,
      isFavorite
    } = body;

    // Validate required fields
    if (!title || !occasion || !timeOfDay) {
      return NextResponse.json(
        { error: 'Missing required fields: title, occasion, timeOfDay' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Get user from database, create if doesn't exist
    let { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_user_id', userId)
      .single();

    // If user doesn't exist, create them
    if (userError && userError.code === 'PGRST116') {
      console.log('User not found, creating new user for:', userId);
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          clerk_user_id: userId,
          preferences: {}
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creating user:', createError);
        throw createError;
      }

      user = newUser;
    } else if (userError) {
      throw userError;
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Failed to get or create user' },
        { status: 500 }
      );
    }

    // Create outfit
    const { data: outfit, error: outfitError } = await supabase
      .from('outfits')
      .insert({
        user_id: user.id,
        title,
        image_url: imageUrl,
        cloudinary_public_id: cloudinaryPublicId,
        occasion,
        time_of_day: timeOfDay,
        ai_analysis: aiAnalysis || {},
        user_rating: userRating,
        is_favorite: isFavorite || false
      })
      .select()
      .single();

    if (outfitError) {
      throw outfitError;
    }

    return NextResponse.json({ outfit }, { status: 201 });

  } catch (error: any) {
    console.error('Create outfit error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    });
    return NextResponse.json(
      { error: 'Failed to create outfit', details: error.message },
      { status: 500 }
    );
  }
}
