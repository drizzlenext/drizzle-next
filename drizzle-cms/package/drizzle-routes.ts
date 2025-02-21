import { NextRequest, NextResponse } from "next/server";
import { DrizzleCmsConfig } from "./types";
import { eq, getTableColumns } from "drizzle-orm";
import { createSchemaFactory } from "drizzle-zod";

const { createUpdateSchema, createInsertSchema } = createSchemaFactory({
  coerce: {
    date: true,
    boolean: true,
  },
});

export function POST_REQUEST(config: DrizzleCmsConfig) {
  return withErrorHandling(async function (request: NextRequest) {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const body = await request.json();
    const param0 = segments[0];
    if (param0 !== "api") {
      return new NextResponse(JSON.stringify({ message: "not found" }), {
        status: 404,
      });
    }
    const curTable = segments[1];
    const id = segments[2];
    const db = config.db;
    const schema = config.schema[curTable];
    const drizzleSchema = schema.drizzleSchema;

    const obj = getEmptyDrizzleObject(drizzleSchema);

    const insertSchema = createInsertSchema(drizzleSchema);

    const validatedFields = insertSchema.safeParse({ ...obj, ...body });

    if (!validatedFields.success) {
      console.error(validatedFields.error.flatten().fieldErrors);
      return NextResponse.json(validatedFields.error.flatten().fieldErrors, {
        status: 400,
      });
    }

    if (!(curTable in db.query)) {
      return NextResponse.json({ message: `not found` }, { status: 404 });
    }
    await db.insert(drizzleSchema).values(validatedFields.data);
    return NextResponse.json({ message: `Create success` });
  });
}

export function PUT_REQUEST(config: DrizzleCmsConfig) {
  return withErrorHandling(async function (request: NextRequest) {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const body = await request.json();
    const param0 = segments[0];
    if (param0 !== "api") {
      return new NextResponse(JSON.stringify({ message: "not found" }), {
        status: 404,
      });
    }
    const curTable = segments[1];
    const id = segments[2];
    const db = config.db;
    const schema = config.schema[curTable];
    const drizzleSchema = schema.drizzleSchema;

    const obj = getEmptyDrizzleObject(drizzleSchema);

    const updateSchema = createUpdateSchema(drizzleSchema);

    const validatedFields = updateSchema.safeParse({ ...obj, ...body });

    if (!validatedFields.success) {
      return NextResponse.json(validatedFields.error.flatten().fieldErrors, {
        status: 400,
      });
    }

    if (!(curTable in db.query)) {
      return NextResponse.json({ message: `not found` }, { status: 404 });
    }
    await db
      .update(drizzleSchema)
      .set(validatedFields.data)
      .where(eq(drizzleSchema.id, id));
    return NextResponse.json({ message: `Update success` });
  });
}

export function DELETE_REQUEST(config: DrizzleCmsConfig) {
  return withErrorHandling(async function (request: NextRequest) {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const param0 = segments[0];
    if (param0 !== "api") {
      return new NextResponse(JSON.stringify({ message: "not found" }), {
        status: 404,
      });
    }
    const curTable = segments[1];
    const id = segments[2];
    const db = config.db;
    const schema = config.schema[curTable];
    const drizzleSchema = schema.drizzleSchema;

    if (!(curTable in db.query)) {
      return NextResponse.json({ message: `not found` }, { status: 404 });
    }

    await db.delete(drizzleSchema).where(eq(drizzleSchema.id, id));

    return NextResponse.json({ message: "Delete success" });
  });
}

function getEmptyDrizzleObject(drizzleSchema: any) {
  const cols = getTableColumns(drizzleSchema);
  const obj: { [key: string]: any } = {};
  for (const key in cols) {
    if (["id", "createdAt", "updatedAt"].includes(key)) continue;
    obj[key] = null;
  }
  return obj;
}

function withErrorHandling(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async function (request: NextRequest) {
    try {
      return await handler(request);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
