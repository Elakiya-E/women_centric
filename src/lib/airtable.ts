import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID as string
);

/** Fetch all service records */
export async function getServices(): Promise<any[]> {
  const tableId = process.env.AIRTABLE_SERVICES_TABLE as string;
  if (!tableId) throw new Error('AIRTABLE_SERVICES_TABLE is not defined');
  const records = await base(tableId).select({ view: 'Grid view' }).all();
  return records.map((rec) => ({
    id: rec.id,
    ...rec.fields,
  }));
}

/** Booking payload interface */
export interface BookingPayload {
  serviceId: string;
  name: string;
  phone: string;
  city: string;
  date: string;
  time: string;
  requirement: string;
  latitude: number;
  longitude: number;
}

/** Insert a new booking record */
export async function createBooking(data: BookingPayload): Promise<any> {
  const tableId = process.env.AIRTABLE_BOOKINGS_TABLE as string;
  if (!tableId) throw new Error('AIRTABLE_BOOKINGS_TABLE is not defined');
  const record = await base(tableId).create({
    ServiceId: data.serviceId,
    Name: data.name,
    Phone: data.phone,
    City: data.city,
    Date: data.date,
    Time: data.time,
    Requirement: data.requirement,
    Latitude: data.latitude,
    Longitude: data.longitude,
    Status: 'Pending',
  });
  return { id: record.id, ...record.fields };
}
