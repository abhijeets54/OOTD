import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Server-side Supabase client with Clerk integration
export function createServerSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    async accessToken() {
      return (await auth()).getToken()
    },
  })
}

// Client-side Supabase client (for use in components)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  clerk_user_id: string
  email?: string
  first_name?: string
  last_name?: string
  preferences?: UserPreferences
  created_at: string
  updated_at: string
}

export interface UserPreferences {
  gender?: string
  religion?: string
  style_preferences?: string[]
  color_preferences?: string[]
  budget_range?: string
  comfort_priority?: number
}

export interface Outfit {
  id: string
  user_id: string
  title: string
  image_url?: string
  cloudinary_public_id?: string
  occasion: string
  time_of_day: string
  ai_analysis?: OutfitAnalysis
  user_rating?: number
  is_favorite: boolean
  created_at: string
  updated_at: string
}

export interface OutfitAnalysis {
  upper_wear?: string
  lower_wear?: string
  footwear?: string
  accessories?: string[]
  colors?: string[]
  styling_tips?: string[]
  cultural_considerations?: string[]
  budget_options?: {
    premium?: string
    moderate?: string
    budget?: string
  }
  ai_feedback?: string
  style_score?: number | null
}

export interface OutfitQuestion {
  id: string
  outfit_id: string
  question_id: string
  question_text: string
  answer: string
  created_at: string
}

// Helper function to get or create user
export async function getOrCreateUser(userId: string) {
  const supabase = createServerSupabaseClient();

  let { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_user_id', userId)
    .single();

  // If user doesn't exist, create them
  if (error && error.code === 'PGRST116') {
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert({
        clerk_user_id: userId,
        preferences: {}
      })
      .select()
      .single();

    if (createError) {
      throw createError;
    }

    user = newUser;
  } else if (error) {
    throw error;
  }

  return user;
}

// Database helper functions
export const dbHelpers = {
  // User operations
  async createUser(clerkUserId: string, userData: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .insert({
        clerk_user_id: clerkUserId,
        ...userData
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserByClerkId(clerkUserId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_user_id', clerkUserId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async updateUser(clerkUserId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('clerk_user_id', clerkUserId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Outfit operations
  async createOutfit(outfitData: Omit<Outfit, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('outfits')
      .insert(outfitData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserOutfits(userId: string) {
    const { data, error } = await supabase
      .from('outfits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async updateOutfit(outfitId: string, updates: Partial<Outfit>) {
    const { data, error } = await supabase
      .from('outfits')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', outfitId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteOutfit(outfitId: string) {
    const { error } = await supabase
      .from('outfits')
      .delete()
      .eq('id', outfitId)
    
    if (error) throw error
  },

  // Outfit questions operations
  async saveOutfitQuestions(outfitId: string, questions: Array<{questionId: string, questionText: string, answer: string}>) {
    const questionsData = questions.map(q => ({
      outfit_id: outfitId,
      question_id: q.questionId,
      question_text: q.questionText,
      answer: q.answer
    }))

    const { data, error } = await supabase
      .from('outfit_questions')
      .insert(questionsData)
      .select()
    
    if (error) throw error
    return data
  },

  async getOutfitQuestions(outfitId: string) {
    const { data, error } = await supabase
      .from('outfit_questions')
      .select('*')
      .eq('outfit_id', outfitId)
    
    if (error) throw error
    return data
  }
}
