-- OOTD Database Schema for Supabase PostgreSQL
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (linked to Clerk authentication)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_user_id TEXT UNIQUE NOT NULL,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Outfits table
CREATE TABLE IF NOT EXISTS outfits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    image_url TEXT,
    cloudinary_public_id TEXT,
    occasion TEXT NOT NULL,
    time_of_day TEXT NOT NULL,
    ai_analysis JSONB DEFAULT '{}',
    user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Outfit questions table (for storing dynamic questions and answers)
CREATE TABLE IF NOT EXISTS outfit_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    outfit_id UUID REFERENCES outfits(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL,
    question_text TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_outfits_user_id ON outfits(user_id);
CREATE INDEX IF NOT EXISTS idx_outfits_created_at ON outfits(created_at);
CREATE INDEX IF NOT EXISTS idx_outfit_questions_outfit_id ON outfit_questions(outfit_id);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE outfits ENABLE ROW LEVEL SECURITY;
ALTER TABLE outfit_questions ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Outfits policies
CREATE POLICY "Users can view own outfits" ON outfits
    FOR SELECT USING (
        user_id IN (
            SELECT id FROM users WHERE clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
        )
    );

CREATE POLICY "Users can insert own outfits" ON outfits
    FOR INSERT WITH CHECK (
        user_id IN (
            SELECT id FROM users WHERE clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
        )
    );

CREATE POLICY "Users can update own outfits" ON outfits
    FOR UPDATE USING (
        user_id IN (
            SELECT id FROM users WHERE clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
        )
    );

CREATE POLICY "Users can delete own outfits" ON outfits
    FOR DELETE USING (
        user_id IN (
            SELECT id FROM users WHERE clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
        )
    );

-- Outfit questions policies
CREATE POLICY "Users can view own outfit questions" ON outfit_questions
    FOR SELECT USING (
        outfit_id IN (
            SELECT o.id FROM outfits o
            JOIN users u ON o.user_id = u.id
            WHERE u.clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
        )
    );

CREATE POLICY "Users can insert own outfit questions" ON outfit_questions
    FOR INSERT WITH CHECK (
        outfit_id IN (
            SELECT o.id FROM outfits o
            JOIN users u ON o.user_id = u.id
            WHERE u.clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
        )
    );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_outfits_updated_at BEFORE UPDATE ON outfits
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
-- You can remove this section if you don't want sample data

-- Sample user preferences structure (for reference)
-- {
--   "gender": "male",
--   "religion": "hindu",
--   "style_preferences": ["traditional", "formal"],
--   "color_preferences": ["blue", "black", "white"],
--   "budget_range": "moderate",
--   "comfort_priority": 8
-- }

-- Sample AI analysis structure (for reference)
-- {
--   "upper_wear": "Blue formal shirt",
--   "lower_wear": "Black formal trousers",
--   "footwear": "Black leather shoes",
--   "accessories": ["Watch", "Belt", "Tie"],
--   "colors": ["Blue", "Black", "White"],
--   "styling_tips": ["Ensure proper fit", "Iron clothes well"],
--   "cultural_considerations": ["Appropriate for formal occasions"],
--   "budget_options": {
--     "premium": "₹15,000 - ₹25,000",
--     "moderate": "₹8,000 - ₹15,000",
--     "budget": "₹3,000 - ₹8,000"
--   },
--   "ai_feedback": "Great choice for formal occasions",
--   "style_score": 8.5
-- }
