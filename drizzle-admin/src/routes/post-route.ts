import { NextRequest, NextResponse } from "next/server";
import { DrizzleAdminConfig } from "../types/types";
import { createSchemaFactory } from "drizzle-zod";
import { getEmptyDrizzleObject, withErrorHandling } from "./route-utils";
import { camelCase, kebabCase } from "change-case-all";
import { uploadFile } from "../lib/server-utils";

const { createInsertSchema } = createSchemaFactory({
  coerce: true,
});

export function POST_ROUTE(config: DrizzleAdminConfig) {
  return withErrorHandling(async function (request: NextRequest) {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const param0 = segments[0];
    const curTable = camelCase(segments[1]);
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

    const drizzleTable = schema.drizzleTable;
    const obj = getEmptyDrizzleObject(drizzleTable);
    const insertSchema = createInsertSchema(drizzleTable);
    const validatedFields = insertSchema.safeParse({ ...obj, ...body });

    if (param0 !== "api") {
      return new NextResponse(JSON.stringify({ message: "not found" }), {
        status: 404,
      });
    }

    if (!(curTable in db.query)) {
      return NextResponse.json({ message: `Not found` }, { status: 404 });
    }

    if (!validatedFields.success) {
      console.error(validatedFields.error.flatten().fieldErrors);
      const res = {
        message: "Invalid data",
        error: validatedFields.error.flatten().fieldErrors,
      };
      return NextResponse.json(res, {
        status: 400,
      });
    }

    await db.insert(drizzleTable).values(validatedFields.data);
    return NextResponse.json({ message: `Created successfully` });
  });
}
