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

    // Get user from database
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_user_id', userId)
      .single()

    if (userError && userError.code !== 'PGRST116') {
      throw userError
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
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
    return NextResponse.json(
      { error: 'Failed to get outfits' },
      { status: 500 }
    );
  }
}

// POST - Create new outfit
export async function POST(request: Request) {
  try {
    const { userId } = await auth();
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

    // Get user from database
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_user_id', userId)
      .single();

    if (userError && userError.code !== 'PGRST116') {
      throw userError;
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
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
    return NextResponse.json(
      { error: 'Failed to create outfit' },
      { status: 500 }
    );
  }
}
