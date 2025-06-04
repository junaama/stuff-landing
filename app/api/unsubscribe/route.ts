import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { claimId } = await request.json();

  if (!claimId) {
    return NextResponse.json({ error: 'Claim ID is required.' }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: 'Supabase credentials not configured.' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    const { data, error } = await supabase
      .from('waitlist')
      .update({ opted_out: true })
      .eq('claim_id', claimId).select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message || 'Failed to update opt-out status.' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Claim ID not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Successfully unsubscribed.' }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
} 