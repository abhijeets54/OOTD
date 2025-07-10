import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { cloudinaryHelpers } from '@/lib/cloudinary';

// GET - Get specific outfit
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id: outfitId } = await params;
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

    // Get specific outfit
    const { data: outfit, error: outfitError } = await supabase
      .from('outfits')
      .select('*')
      .eq('id', outfitId)
      .eq('user_id', user.id)
      .single();

    if (outfitError || !outfit) {
      return NextResponse.json(
        { error: 'Outfit not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ outfit });

  } catch (error: any) {
    console.error('Get outfit error:', error);
    return NextResponse.json(
      { error: 'Failed to get outfit' },
      { status: 500 }
    );
  }
}

// PUT - Update outfit
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id: outfitId } = await params;
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

    // Prepare updates
    const updates: any = {
      updated_at: new Date().toISOString()
    };
    if (title !== undefined) updates.title = title;
    if (imageUrl !== undefined) updates.image_url = imageUrl;
    if (cloudinaryPublicId !== undefined) updates.cloudinary_public_id = cloudinaryPublicId;
    if (occasion !== undefined) updates.occasion = occasion;
    if (timeOfDay !== undefined) updates.time_of_day = timeOfDay;
    if (aiAnalysis !== undefined) updates.ai_analysis = aiAnalysis;
    if (userRating !== undefined) updates.user_rating = userRating;
    if (isFavorite !== undefined) updates.is_favorite = isFavorite;

    // Update outfit
    const { data: outfit, error: outfitError } = await supabase
      .from('outfits')
      .update(updates)
      .eq('id', outfitId)
      .eq('user_id', user.id) // Ensure user owns the outfit
      .select()
      .single();

    if (outfitError) {
      throw outfitError;
    }

    return NextResponse.json({ outfit });

  } catch (error: any) {
    console.error('Update outfit error:', error);
    return NextResponse.json(
      { error: 'Failed to update outfit' },
      { status: 500 }
    );
  }
}

// DELETE - Delete outfit
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id: outfitId } = await params;
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

    // Get outfit to check ownership and get cloudinary public_id
    const { data: outfit, error: outfitError } = await supabase
      .from('outfits')
      .select('*')
      .eq('id', outfitId)
      .eq('user_id', user.id)
      .single();

    if (outfitError || !outfit) {
      return NextResponse.json(
        { error: 'Outfit not found' },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary if it exists
    if (outfit.cloudinary_public_id) {
      try {
        await cloudinaryHelpers.deleteImage(outfit.cloudinary_public_id);
      } catch (cloudinaryError) {
        console.error('Failed to delete image from Cloudinary:', cloudinaryError);
        // Continue with database deletion even if Cloudinary deletion fails
      }
    }

    // Delete outfit from database
    const { error: deleteError } = await supabase
      .from('outfits')
      .delete()
      .eq('id', outfitId)
      .eq('user_id', user.id);

    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json({
      success: true,
      message: 'Outfit deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete outfit error:', error);
    return NextResponse.json(
      { error: 'Failed to delete outfit' },
      { status: 500 }
    );
  }
}
