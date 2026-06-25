import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/attendants/register?mobile=... - Retrieve registration status/progress by mobile number
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const mobile = searchParams.get("mobile");

    if (!mobile) {
      return NextResponse.json({ message: "Mobile number is required" }, { status: 400 });
    }

    const registration = await prisma.attendantRegistration.findUnique({
      where: { mobileNumber: mobile },
    });

    if (!registration) {
      return NextResponse.json({ message: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json(registration, { status: 200 });
  } catch (error: any) {
    console.error("Attendant Registration Query Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/attendants/register - Create or update registration progress
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { mobileNumber } = data;

    if (!mobileNumber) {
      return NextResponse.json({ message: "Mobile number is required" }, { status: 400 });
    }

    // Check if registration exists
    const existing = await prisma.attendantRegistration.findUnique({
      where: { mobileNumber },
    });

    const payload = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      profilePhotoBase64: data.profilePhotoBase64 || null,
      dateOfBirth: data.dateOfBirth,
      age: data.age ? parseInt(data.age) : 0,
      address: data.address,
      city: data.city,
      state: data.state || "Tamil Nadu",
      pinCode: data.pinCode,
      emergencyContact: data.emergencyContact,

      selectedServices: data.selectedServices || [],
      selectedSubServices: data.selectedSubServices || {},
      subServiceExperience: data.subServiceExperience || {},

      workingDays: data.workingDays || [],
      availableFrom: data.availableFrom || null,
      availableTo: data.availableTo || null,
      preferredWorkingShift: data.preferredWorkingShift || null,
      preferredCities: data.preferredCities || [],

      yearsOfExperience: data.yearsOfExperience ? parseInt(data.yearsOfExperience) : 0,
      languagesKnown: data.languagesKnown || [],
      certifications: data.certifications || null,
      specialSkills: data.specialSkills || null,
      previousExperience: data.previousExperience || null,

      aadhaarBase64: data.aadhaarBase64 || null,
      drivingLicenseBase64: data.drivingLicenseBase64 || null,
      panCardBase64: data.panCardBase64 || null,
      professionalCertBase64: data.professionalCertBase64 || null,
      policeVerifBase64: data.policeVerifBase64 || null,
      nursingDegreeBase64: data.nursingDegreeBase64 || null,
      nursingRegCertBase64: data.nursingRegCertBase64 || null,
      physioDegreBase64: data.physioDegreBase64 || null,
      physioRegCertBase64: data.physioRegCertBase64 || null,
      experienceProofBase64: data.experienceProofBase64 || null,
      criminalBgCheckBase64: data.criminalBgCheckBase64 || null,

      registrationStep: data.registrationStep ? parseInt(data.registrationStep) : 1,
      status: data.status || "Pending Approval",
      approvalStatus: data.approvalStatus || "Pending Approval",
      accountStatus: data.accountStatus || "Inactive",
    };

    let registration;

    if (existing) {
      registration = await prisma.attendantRegistration.update({
        where: { mobileNumber },
        data: payload,
      });
    } else {
      registration = await prisma.attendantRegistration.create({
        data: {
          mobileNumber,
          ...payload,
        },
      });
    }

    return NextResponse.json(
      { message: "Registration updated successfully", registration },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Attendant Registration Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
