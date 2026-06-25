import { NextResponse } from 'next/server';
import { createBooking, BookingPayload } from '@/lib/airtable';

// POST /api/airtable/bookings – Add a new booking record to Airtable
export async function POST(request: Request) {
  try {
    const body: BookingPayload = await request.json();
    // Basic validation (you can expand as needed)
    const required = ['serviceId', 'name', 'phone', 'city', 'date', 'time', 'requirement', 'latitude', 'longitude'];
    for (const key of required) {
      if (body[key as keyof BookingPayload] === undefined || body[key as keyof BookingPayload] === null) {
        return NextResponse.json({ error: `Missing or invalid '${key}'` }, { status: 400 });
      }
    }
    const record = await createBooking(body);
    return NextResponse.json(record, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/airtable/bookings error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
