import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";

type RegisterUserPayload = {
  fullName?: string;
  nicNumber?: string;
  role?: string;
  ward?: string;
  staffId?: string;
};

const roleMap: Record<string, Role> = {
  admin: Role.ADMIN,
  nurse: Role.NURSE,
  doctor: Role.DOCTOR,
  office_clerk: Role.OFFICE_CLERK,
  kitchen: Role.KITCHEN_CLERK,
};

function normalizeWard(ward?: string) {
  if (!ward || ward === "none") return null;
  return ward;
}

function generateDefaultEmail(staffId: string, nicNumber: string) {
  const safeStaffId = staffId.trim().toLowerCase();
  const safeNic = nicNumber.trim().toLowerCase();
  return `${safeStaffId}.${safeNic}@hospital.local`;
}

function generatePasswordHash(staffId: string, nicNumber: string) {
  return createHash("sha256").update(`${staffId}:${nicNumber}`).digest("hex");
}

export async function GET() {
  try {
    const users = await prisma.staff.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        NIC: true,
        role: true,
        ward: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch users";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterUserPayload;

    const fullName = body.fullName?.trim();
    const nicNumber = body.nicNumber?.trim();
    const staffId = body.staffId?.trim();
    const roleKey = body.role?.trim().toLowerCase();

    if (!fullName || !nicNumber || !staffId || !roleKey) {
      return NextResponse.json(
        { error: "Missing required fields: fullName, nicNumber, staffId, role" },
        { status: 400 }
      );
    }

    const mappedRole = roleMap[roleKey];
    if (!mappedRole) {
      return NextResponse.json({ error: "Invalid role value" }, { status: 400 });
    }

    const email = generateDefaultEmail(staffId, nicNumber);
    const passwordHash = generatePasswordHash(staffId, nicNumber);

    const created = await prisma.staff.create({
      data: {
        name: fullName,
        email,
        NIC: nicNumber,
        role: mappedRole,
        ward: normalizeWard(body.ward),
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        NIC: true,
        role: true,
        ward: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user: created }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create user";

    if (
      typeof message === "string" &&
      (message.includes("Unique constraint") || message.includes("duplicate key"))
    ) {
      return NextResponse.json(
        { error: "A user with the same NIC or generated email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const idParam = requestUrl.searchParams.get("id");
    const actorRole = request.headers.get("x-user-role")?.toUpperCase();

    if (actorRole !== "ADMIN") {
      return NextResponse.json({ error: "You do not have permission to delete staff members" }, { status: 403 });
    }

    if (!idParam) {
      return NextResponse.json({ error: "Missing required query parameter: id" }, { status: 400 });
    }

    const id = Number.parseInt(idParam, 10);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id parameter" }, { status: 400 });
    }

    await prisma.staff.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete user";

    if (
      typeof message === "string" &&
      (message.includes("Foreign key constraint") || message.includes("violates foreign key"))
    ) {
      return NextResponse.json(
        { error: "Cannot delete this user because related records exist" },
        { status: 409 }
      );
    }

    if (typeof message === "string" && message.includes("Record to delete does not exist")) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
