import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/attendant-registration/[id]/verification - Retrieve verification checklist status
export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const registration = await prisma.attendantRegistration.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        mobileNumber: true,
        verificationProgress: true,
        status: true,
        bgvAadhaarVerified: true,
        bgvPanVerified: true,
        bgvPoliceVerified: true,
        bgvCriminalBgCheck: true,
        bgvNeighbourhoodEnquiry: true,
        bgvAddressVerified: true,
        bgvEmploymentHistoryChecked: true,
        bgvReferencesVerified: true,
        bgvExperienceVerified: true,
      },
    });

    if (!registration) {
      return NextResponse.json({ message: "Registration profile not found" }, { status: 404 });
    }

    return NextResponse.json(registration, { status: 200 });
  } catch (error: any) {
    console.error("GET BGV Status Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

// PATCH /api/attendant-registration/[id]/verification - Update specific checks or status
export async function PATCH(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const data = await req.json();

    // Verify record exists
    const existing = await prisma.attendantRegistration.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ message: "Registration profile not found" }, { status: 404 });
    }

    // Capture fields to update
    const updateData: any = {};

    const booleanChecks = [
      "bgvAadhaarVerified", "bgvPanVerified", "bgvPoliceVerified",
      "bgvCriminalBgCheck", "bgvNeighbourhoodEnquiry", "bgvAddressVerified",
      "bgvEmploymentHistoryChecked", "bgvReferencesVerified", "bgvExperienceVerified"
    ];

    for (const key of booleanChecks) {
      if (typeof data[key] === "boolean") {
        updateData[key] = data[key];
      }
    }

    if (data.verificationProgress) {
      updateData.verificationProgress = data.verificationProgress; // SUBMITTED, IN_PROGRESS, VERIFIED, APPROVED
    }

    if (data.status) {
      updateData.status = data.status; // e.g. Approved, Rejected, Pending Approval
    }

    if (data.rejectionReason !== undefined) {
      updateData.rejectionReason = data.rejectionReason;
    }

    if (data.adminNotes !== undefined) {
      updateData.adminNotes = data.adminNotes;
    }

    // Update the record
    const updated = await prisma.attendantRegistration.update({
      where: { id },
      data: updateData,
    });

    // If verification status is set to APPROVED, let's create the actual Attendant profile
    // to simulate full registration completion!
    if (data.status === "Approved" && existing.status !== "Approved") {
      // 1. Create Attendant record
      const newAttendant = await prisma.attendant.create({
        data: {
          name: updated.fullName,
          role: updated.selectedServices[0] || "General Attendant",
          experience: `${updated.yearsOfExperience} Years`,
          languages: updated.languagesKnown,
          rating: 5.0,
          certifications: updated.certifications ? [updated.certifications] : [],
          bgGradient: "from-pink-100 to-purple-100",
          email: updated.email,
          address: updated.address,
          state: updated.state,
          pinCode: updated.pinCode,
          emergencyContact: updated.emergencyContact,
          profilePhotoBase64: updated.profilePhotoBase64,
          selectedServices: updated.selectedServices,
          selectedSubServices: (updated as any).selectedSubServices,
          subServiceExperience: (updated as any).subServiceExperience,
          aadhaarBase64: updated.aadhaarBase64,
          aadhaarStatus: updated.bgvAadhaarVerified ? "Verified" : "Pending",
          panCardBase64: updated.panCardBase64,
          panStatus: updated.bgvPanVerified ? "Verified" : "Pending",
          drivingLicenseBase64: updated.drivingLicenseBase64,
          dlStatus: updated.drivingLicenseBase64 ? "Verified" : "Pending",
          professionalCertBase64: updated.professionalCertBase64,
          certificatesStatus: updated.professionalCertBase64 ? "Uploaded" : "Pending",
          policeVerifBase64: updated.policeVerifBase64,
          policeVerifStatus: updated.bgvPoliceVerified ? "Verified" : "Pending",
          nursingDegreeBase64: updated.nursingDegreeBase64,
          nursingRegCertBase64: updated.nursingRegCertBase64,
          physioDegreBase64: updated.physioDegreBase64,
          physioRegCertBase64: updated.physioRegCertBase64,
          experienceProofBase64: updated.experienceProofBase64,
          criminalBgCheckBase64: updated.criminalBgCheckBase64,
          workingDays: updated.workingDays,
          availableFrom: (updated as any).availableFrom,
          availableTo: (updated as any).availableTo,
          preferredWorkingShift: (updated as any).preferredWorkingShift,
          preferredCities: (updated as any).preferredCities,
          verificationStatus: "Account Activated",
          status: "AVAILABLE",
        }
      });

      // 2. Create AttendantAccount (so they can log in if they need to)
      await prisma.attendantAccount.create({
        data: {
          attendantId: newAttendant.id,
          mobileNumber: updated.mobileNumber,
          email: updated.email,
          passwordHash: updated.password, // Storing raw password for prototype/simulation simplicity
          status: "AVAILABLE",
        }
      });

      // 3. Mark registration step as 8 (Account Activated)
      await prisma.attendantRegistration.update({
        where: { id },
        data: {
          registrationStep: 8,
          accountStatus: "Active",
          approvedAt: new Date(),
        }
      });
    }

    return NextResponse.json(
      { message: "BGV checks updated successfully", registration: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PATCH BGV Status Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
