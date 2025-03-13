import { NextRequest, NextResponse } from "next/server";
import { DrizzleAdminConfig } from "../types/types";
import { createSchemaFactory } from "drizzle-zod";
import { eq } from "drizzle-orm";
import { getEmptyDrizzleObject, withErrorHandling } from "./route-utils";
import { camelCase, kebabCase } from "change-case-all";
import { uploadFile } from "../lib/server-utils";

const { createUpdateSchema } = createSchemaFactory({
  coerce: true,
});

export function PUT_ROUTE(config: DrizzleAdminConfig) {
  return withErrorHandling(async function (request: NextRequest) {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const param0 = segments[0];
    const curTable = camelCase(segments[1]);
    const id = segments[2];
    const db = config.db;
    const schema = config.schema[curTable];

    let body: any = {};
    const contentType = request.headers.get("content-type");
    if (contentType?.startsWith("multipart/form-data")) {      
      const formData = await request.formData();
      formData.forEach((value, key) => {
        body[key] = value;
      });
      if (schema.formControlMap) {
        for (const key in schema.formControlMap) {
          const value = schema.formControlMap[key];
          if (value === "file" && body[key] instanceof File) {
              const fileFieldUri = await uploadFile({ file: body[key], dir: `${kebabCase(curTable)}/${kebabCase(key)}` })
              body[key] = fileFieldUri;
          }
        }
      }
    } else if (contentType?.startsWith("application/json")) {
      body = await request.json();
      for (const key in schema.formControlMap) {
        const value = schema.formControlMap[key];
        if (value === "file" && typeof body[key] !== "string") {
            body[key] = null;
        }
      }
    }

    if (!schema) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }

    const drizzleSchema = schema.drizzleTable;
    const obj = getEmptyDrizzleObject(drizzleSchema);
    const updateSchema = createUpdateSchema(drizzleSchema);
    const validatedFields = updateSchema.safeParse({ ...obj, ...body });

    if (param0 !== "api") {
      return new NextResponse(JSON.stringify({ message: "not found" }), {
        status: 404,
      });
    }

    if (!(curTable in db.query)) {
      return NextResponse.json({ message: `Not found` }, { status: 404 });
    }

    if (!validatedFields.success) {
      const res = {
        message: "Invalid data",
        error: validatedFields.error.flatten().fieldErrors,
      };
      return NextResponse.json(res, {
        status: 400,
      });
    }

    await db
      .update(drizzleSchema)
      .set(validatedFields.data)
      .where(eq(drizzleSchema.id, id));

    return NextResponse.json({ message: `Updated successfully` });
  });
}
