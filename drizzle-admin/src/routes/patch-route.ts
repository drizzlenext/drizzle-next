import { NextRequest, NextResponse } from "next/server";
import { DrizzleAdminConfig } from "../types/types";
import { createSchemaFactory } from "drizzle-zod";
import { eq } from "drizzle-orm";
import { withErrorHandling } from "./route-utils";
import { camelCase } from "change-case-all";
import { getFormControlMap } from "../lib/shared-utils";
import { getColumnDataTypeMap } from "../lib/server-utils";

const { createUpdateSchema } = createSchemaFactory({
  coerce: true,
});

export function PATCH_ROUTE(config: DrizzleAdminConfig) {
  return withErrorHandling(async function (request: NextRequest) {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const body = await request.json();
    const param0 = segments[0];
    const curTable = camelCase(segments[1]);
    const id = segments[2];
    const db = config.db;
    const schema = config.schema[curTable];

    if (!schema) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }

    const drizzleTable = schema.drizzleTable;
    const patchSchema = createUpdateSchema(drizzleTable);

    const columnDataTypeMap = getColumnDataTypeMap(drizzleTable)
    const formControlMap = getFormControlMap(columnDataTypeMap)
    
    // handle json parsing for json types
    for (const key in formControlMap) {
      const value = formControlMap[key];
      if (value === "json" && body[key]) {
        body[key] = JSON.parse(body[key])
      }
    }

    const validatedFields = patchSchema.safeParse(body);
    
    if (param0 !== "api") {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }

    if (!validatedFields.success) {
      return NextResponse.json(validatedFields.error.flatten().fieldErrors, {
        status: 400,
      });
    }

    const obj = await db.query[curTable].findFirst({
      where: eq(drizzleTable.id, id),
    });

    if (!obj) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    await db
      .update(drizzleTable)
      .set(validatedFields.data)
      .where(eq(drizzleTable.id, id));

    return NextResponse.json({ message: `Patched successfully` });
  });
}
