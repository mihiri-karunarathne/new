import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type IngredientSubstitutePayload = {
  name?: string;
  priority?: number;
};

type RegisterIngredientPayload = {
  serial?: string | number;
  category?: string;
  name?: string;
  specification?: string;
  substitutes?: IngredientSubstitutePayload[];
  notes?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterIngredientPayload;

    const serialValue = Number.parseInt(String(body.serial ?? ""), 10);
    const category = body.category?.trim();
    const name = body.name?.trim();
    const specification = body.specification?.trim();
    const notes = body.notes?.trim();

    if (Number.isNaN(serialValue) || !category || !name) {
      return NextResponse.json(
        { error: "Missing required fields: serial, category, name" },
        { status: 400 }
      );
    }

    const substitutes = (body.substitutes ?? [])
      .map((item) => ({
        name: item.name?.trim() ?? "",
        priority: Number.isFinite(item.priority) ? Number(item.priority) : 0,
      }))
      .filter((item) => item.name.length > 0);

    const created = await prisma.ingredient.create({
      data: {
        serialNumber: serialValue,
        categoryType: category,
        name,
        specification: specification || null,
        notes: notes || null,
        substitutes: {
          create: substitutes.map((item) => ({
            name: item.name,
            priority: item.priority,
          })),
        },
      },
      include: {
        substitutes: {
          orderBy: { priority: "asc" },
        },
      },
    });

    return NextResponse.json({ ingredient: created }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to register ingredient";

    if (
      typeof message === "string" &&
      (message.includes("Unique constraint") || message.includes("duplicate key"))
    ) {
      return NextResponse.json(
        { error: "Serial number already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany({
      orderBy: { serialNumber: "asc" },
      include: {
        substitutes: {
          orderBy: { priority: "asc" },
        },
      },
    });

    return NextResponse.json({ ingredients }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch ingredients";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
