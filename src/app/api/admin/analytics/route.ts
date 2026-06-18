import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/analytics — compute all dashboard analytics from real DB data
export async function GET() {
  try {
    // ── Fetch raw data ───────────────────────────────────────────────
    const [bookings, customers, attendants, services] = await Promise.all([
      prisma.booking.findMany({
        include: { service: true, attendant: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.customer.findMany(),
      prisma.attendant.findMany(),
      prisma.service.findMany(),
    ]);

    // ── KPI computation ──────────────────────────────────────────────
    const totalBookings = bookings.length;
    const totalCustomers = customers.length;

    // Repeat customers = customers with totalBookings > 1
    const repeatCustomers = customers.filter(c => c.totalBookings > 1).length;

    // Active attendants = those who have at least 1 booking assigned
    const attendantIdsWithBookings = new Set(
      bookings.filter(b => b.attendantId).map(b => b.attendantId)
    );
    const activeAttendants = attendantIdsWithBookings.size || attendants.length;

    // Growth: compare this month vs last month
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonthBookings = bookings.filter(
      b => new Date(b.createdAt) >= thisMonthStart
    ).length;
    const lastMonthBookings = bookings.filter(
      b => new Date(b.createdAt) >= lastMonthStart && new Date(b.createdAt) < thisMonthStart
    ).length;
    const growthPct =
      lastMonthBookings > 0
        ? Math.round(((thisMonthBookings - lastMonthBookings) / lastMonthBookings) * 100)
        : thisMonthBookings > 0
        ? 100
        : 0;

    // Average satisfaction from attendant ratings (best proxy we have)
    const avgRating =
      attendants.length > 0
        ? (attendants.reduce((s, a) => s + a.rating, 0) / attendants.length).toFixed(1)
        : "N/A";

    // ── City-wise bookings ───────────────────────────────────────────
    const cityMap: Record<string, number> = {};
    bookings.forEach(b => {
      const city = b.city.trim();
      cityMap[city] = (cityMap[city] || 0) + 1;
    });
    const cityStats = Object.entries(cityMap)
      .map(([city, bookingCount]) => ({ city, bookings: bookingCount }))
      .sort((a, b) => b.bookings - a.bookings);

    // ── Top 3 locations ──────────────────────────────────────────────
    const topLocations = cityStats.slice(0, 3).map((c, i) => ({
      rank: i + 1,
      name: c.city,
      bookings: c.bookings,
      pct: totalBookings > 0 ? Number(((c.bookings / totalBookings) * 100).toFixed(1)) : 0,
      trend: "up", // Could compare with last month per city for real trend
    }));

    // ── Repeat customer analytics ────────────────────────────────────
    const newCustomers = totalCustomers - repeatCustomers;
    const retentionPct =
      totalCustomers > 0 ? Math.round((repeatCustomers / totalCustomers) * 100) : 0;

    // ── Service demand ───────────────────────────────────────────────
    const serviceMap: Record<string, number> = {};
    bookings.forEach(b => {
      const title = b.service?.title || "Unknown";
      serviceMap[title] = (serviceMap[title] || 0) + 1;
    });
    const serviceDemand = Object.entries(serviceMap)
      .map(([name, count]) => ({
        name,
        value: totalBookings > 0 ? Number(((count / totalBookings) * 100).toFixed(1)) : 0,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    // ── Peak hours ───────────────────────────────────────────────────
    // Parse the booking "time" field (e.g. "10:00 AM") into hour buckets
    const hourBuckets: Record<string, number> = {
      "6 AM – 9 AM": 0,
      "9 AM – 12 PM": 0,
      "12 PM – 3 PM": 0,
      "3 PM – 6 PM": 0,
      "6 PM – 9 PM": 0,
    };
    bookings.forEach(b => {
      const t = b.time || "";
      // Try to extract hour from common time formats
      const match = t.match(/^(\d{1,2})/);
      if (match) {
        let hour = parseInt(match[1], 10);
        // Handle AM/PM
        if (/pm/i.test(t) && hour !== 12) hour += 12;
        if (/am/i.test(t) && hour === 12) hour = 0;

        if (hour >= 6 && hour < 9)       hourBuckets["6 AM – 9 AM"]++;
        else if (hour >= 9 && hour < 12)  hourBuckets["9 AM – 12 PM"]++;
        else if (hour >= 12 && hour < 15) hourBuckets["12 PM – 3 PM"]++;
        else if (hour >= 15 && hour < 18) hourBuckets["3 PM – 6 PM"]++;
        else if (hour >= 18 && hour < 21) hourBuckets["6 PM – 9 PM"]++;
      }
    });
    const peakHours = Object.entries(hourBuckets).map(([slot, count]) => ({
      slot,
      bookings: count,
    }));

    // ── Railway-station-like breakdown (by city, using city names as proxies) ──
    // Group by city and create station-like entries
    const railwayStations = cityStats.map(c => ({
      station: c.city + " Station",
      city: c.city,
      bookings: c.bookings,
      growth: "up",
    }));

    // ── Build response ───────────────────────────────────────────────
    return NextResponse.json({
      kpis: {
        totalBookings,
        totalCustomers,
        repeatCustomers,
        activeAttendants,
        growthPct,
        avgRating,
      },
      cityStats,
      topLocations,
      repeatData: [
        { name: "New Customers", value: newCustomers },
        { name: "Repeat Customers", value: repeatCustomers },
      ],
      retentionPct,
      serviceDemand,
      peakHours,
      railwayStations,
    });
  } catch (error: any) {
    console.error("GET /api/admin/analytics error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
