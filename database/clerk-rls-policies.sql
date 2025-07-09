-- Clerk + Supabase RLS Policies
-- Run this in your Supabase SQL Editor after setting up Clerk integration

-- First, re-enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE outfits ENABLE ROW LEVEL SECURITY;
ALTER TABLE outfit_questions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Users can view own outfits" ON outfits;
DROP POLICY IF EXISTS "Users can insert own outfits" ON outfits;
DROP POLICY IF EXISTS "Users can update own outfits" ON outfits;
DROP POLICY IF EXISTS "Users can delete own outfits" ON outfits;
DROP POLICY IF EXISTS "Users can view own outfit questions" ON outfit_questions;
DROP POLICY IF EXISTS "Users can insert own outfit questions" ON outfit_questions;

-- Users table policies using Clerk session token
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (clerk_user_id = auth.jwt()->>'sub');

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (clerk_user_id = auth.jwt()->>'sub');

CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (clerk_user_id = auth.jwt()->>'sub');

-- Outfits table policies using Clerk session token
CREATE POLICY "Users can view own outfits" ON outfits
    FOR SELECT USING (
        user_id IN (
            SELECT id FROM users WHERE clerk_user_id = auth.jwt()->>'sub'
        )
    );

CREATE POLICY "Users can insert own outfits" ON outfits
    FOR INSERT WITH CHECK (
        user_id IN (
            SELECT id FROM users WHERE clerk_user_id = auth.jwt()->>'sub'
        )
    );

CREATE POLICY "Users can update own outfits" ON outfits
    FOR UPDATE USING (
        user_id IN (
            SELECT id FROM users WHERE clerk_user_id = auth.jwt()->>'sub'
        )
    );

CREATE POLICY "Users can delete own outfits" ON outfits
    FOR DELETE USING (
        user_id IN (
            SELECT id FROM users WHERE clerk_user_id = auth.jwt()->>'sub'
        )
    );

-- Outfit questions table policies using Clerk session token
CREATE POLICY "Users can view own outfit questions" ON outfit_questions
    FOR SELECT USING (
        outfit_id IN (
            SELECT o.id FROM outfits o
            JOIN users u ON o.user_id = u.id
            WHERE u.clerk_user_id = auth.jwt()->>'sub'
        )
    );

CREATE POLICY "Users can insert own outfit questions" ON outfit_questions
    FOR INSERT WITH CHECK (
        outfit_id IN (
            SELECT o.id FROM outfits o
            JOIN users u ON o.user_id = u.id
            WHERE u.clerk_user_id = auth.jwt()->>'sub'
        )
    );

-- Verify the policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('users', 'outfits', 'outfit_questions')
ORDER BY tablename, policyname;
