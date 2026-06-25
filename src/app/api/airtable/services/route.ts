import { NextResponse } from 'next/server';
import { getServices } from '@/lib/airtable';

// GET /api/airtable/services – retrieve all services from Airtable
export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json(services, { status: 200 });
  } catch (error: any) {
    console.error('GET /api/airtable/services error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
