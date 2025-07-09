import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Testing Supabase connection...')
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('Supabase Key (first 20 chars):', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20))

    // Test basic connection with a simple query
    const { data: connectionTest, error: connectionError } = await supabase
      .from('users')
      .select('id')
      .limit(1)
    
    if (connectionError) {
      console.error('Connection test failed:', connectionError)
      return NextResponse.json({
        success: false,
        error: 'Connection failed',
        details: connectionError
      }, { status: 500 })
    }

    console.log('Connection test successful:', connectionTest)

    // Test table existence
    const results = []

    try {
      const { data: usersTest, error: usersError } = await supabase.from('users').select('id').limit(1)
      results.push({ table: 'users', exists: !usersError, data: usersTest, error: usersError?.message })
    } catch (e) {
      results.push({ table: 'users', exists: false, error: e instanceof Error ? e.message : 'Unknown error' })
    }

    try {
      const { data: outfitsTest, error: outfitsError } = await supabase.from('outfits').select('id').limit(1)
      results.push({ table: 'outfits', exists: !outfitsError, data: outfitsTest, error: outfitsError?.message })
    } catch (e) {
      results.push({ table: 'outfits', exists: false, error: e instanceof Error ? e.message : 'Unknown error' })
    }

    try {
      const { data: questionsTest, error: questionsError } = await supabase.from('outfit_questions').select('id').limit(1)
      results.push({ table: 'outfit_questions', exists: !questionsError, data: questionsTest, error: questionsError?.message })
    } catch (e) {
      results.push({ table: 'outfit_questions', exists: false, error: e instanceof Error ? e.message : 'Unknown error' })
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      connection: connectionTest,
      tables: results,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      success: false,
      error: 'Database test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
