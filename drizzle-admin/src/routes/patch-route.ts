import { NextRequest, NextResponse } from "next/server";
import { DrizzleAdminConfig } from "../lib/types";
import { createSchemaFactory } from "drizzle-zod";
import { eq } from "drizzle-orm";
import { withErrorHandling } from "./route-utils";

const { createUpdateSchema } = createSchemaFactory({
  coerce: {
    date: true,
    boolean: true,
  },
});

export function PATCH_ROUTE(config: DrizzleAdminConfig) {
  return withErrorHandling(async function (request: NextRequest) {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const body = await request.json();
    const param0 = segments[0];
    if (param0 !== "api") {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }
    const curTable = segments[1];
    const id = segments[2];
    const db = config.db;
    const schema = config.schema[curTable];
    const drizzleSchema = schema.drizzleTable;

    const patchSchema = createUpdateSchema(drizzleSchema);

    const validatedFields = patchSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(validatedFields.error.flatten().fieldErrors, {
        status: 400,
      });
    }

    const obj = await db.query[curTable].findFirst({
      where: eq(drizzleSchema.id, id),
    });

    if (!obj) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }

    await db
      .update(drizzleSchema)
      .set(validatedFields.data)
      .where(eq(drizzleSchema.id, id));

    return NextResponse.json({ message: `Patch success` });
  });
}
