import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    const registration = await prisma.attendantRegistration.findUnique({ where: { id } });
    if (!registration) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Update registration status
    await prisma.attendantRegistration.update({
      where: { id },
      data: { status: "Approved" },
    });

    // Create Attendant
    const attendant = await prisma.attendant.create({
      data: {
        name: registration.fullName,
        role: "Attendant",
        experience: `${registration.yearsOfExperience} years`,
        languages: registration.languagesKnown,
        rating: 5.0, // Default rating
        certifications: registration.certifications ? [registration.certifications] : [],
        bgGradient: "from-blue-500 to-indigo-500", // Default gradient
        email: registration.email,
        address: registration.address,
        state: registration.state,
        pinCode: registration.pinCode,
        emergencyContact: registration.emergencyContact,
        profilePhotoBase64: registration.profilePhotoBase64,
        selectedServices: registration.selectedServices,
        selectedSubServices: (registration as any).selectedSubServices,
        subServiceExperience: (registration as any).subServiceExperience,
        aadhaarBase64: registration.aadhaarBase64,
        aadhaarStatus: registration.aadhaarBase64 ? "Uploaded" : "Pending",
        panCardBase64: registration.panCardBase64,
        panStatus: registration.panCardBase64 ? "Uploaded" : "Pending",
        drivingLicenseBase64: registration.drivingLicenseBase64,
        dlStatus: registration.drivingLicenseBase64 ? "Uploaded" : "Pending",
        professionalCertBase64: registration.professionalCertBase64,
        certificatesStatus: registration.professionalCertBase64 ? "Uploaded" : "Pending",
        policeVerifBase64: registration.policeVerifBase64,
        policeVerifStatus: registration.policeVerifBase64 ? "Uploaded" : "Pending",
        nursingDegreeBase64: (registration as any).nursingDegreeBase64,
        nursingRegCertBase64: (registration as any).nursingRegCertBase64,
        physioDegreBase64: (registration as any).physioDegreBase64,
        physioRegCertBase64: (registration as any).physioRegCertBase64,
        experienceProofBase64: (registration as any).experienceProofBase64,
        criminalBgCheckBase64: (registration as any).criminalBgCheckBase64,
        workingDays: (registration as any).workingDays,
        availableFrom: (registration as any).availableFrom,
        availableTo: (registration as any).availableTo,
        preferredWorkingShift: (registration as any).preferredWorkingShift,
        preferredCities: (registration as any).preferredCities,
        verificationStatus: "Approved",
      },
    });

    // Upsert AttendantAccount (Avoid duplicates)
    await prisma.attendantAccount.upsert({
      where: { email: registration.email },
      update: {
        attendantId: attendant.id,
        mobileNumber: registration.mobileNumber,
        passwordHash: registration.password,
        status: "AVAILABLE",
      },
      create: {
        attendantId: attendant.id,
        mobileNumber: registration.mobileNumber,
        email: registration.email,
        passwordHash: registration.password,
        status: "AVAILABLE",
      },
    });

    // Create Notification
    await prisma.notification.create({
      data: {
        type: "SYSTEM",
        message: "Your account has been approved. You can now log in to the Attendant Portal.",
        attendantId: attendant.id,
      }
    });

    return NextResponse.json({ message: "Approved successfully" });
  } catch (error: any) {
    console.error("Approve Attendant Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
