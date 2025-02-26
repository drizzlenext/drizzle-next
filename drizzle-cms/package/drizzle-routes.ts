import { NextRequest, NextResponse } from "next/server";
import { DrizzleCmsConfig, Filter } from "./types";
import { createSchemaFactory } from "drizzle-zod";
import { and, asc, desc, eq, getTableColumns } from "drizzle-orm";
import { parseSearchParams } from "./utils/server-utils";
import { OPERATOR_MAP } from "./constants/server-constants";

const { createUpdateSchema, createInsertSchema } = createSchemaFactory({
  coerce: {
    date: true,
    boolean: true,
  },
});

export function POST_ROUTE(config: DrizzleCmsConfig) {
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
    const drizzleTable = schema.drizzleTable;

    const obj = getEmptyDrizzleObject(drizzleTable);

    const insertSchema = createInsertSchema(drizzleTable);

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
    await db.insert(drizzleTable).values(validatedFields.data);
    return NextResponse.json({ message: `Create success` });
  });
}

export function GET_ROUTE(config: DrizzleCmsConfig) {
  return withErrorHandling(async function (request: NextRequest) {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);

    const param0 = segments[0];
    if (param0 !== "api") {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }
    const curTable = segments[1];
    const id = segments[2];
    const db = config.db;

    if (!(curTable in db.query)) {
      return NextResponse.json({ message: `not found` }, { status: 404 });
    }

    const schema = config.schema[curTable];
    const drizzleSchema = schema.drizzleTable;

    // handle object
    if (id) {
      const data = await db.query[curTable].findFirst({
        where: eq(drizzleSchema.id, id),
      });
      return NextResponse.json({ data: data }, { status: 200 });
    }

    // handle list

    const queryParams = Object.fromEntries(url.searchParams.entries());
    const filtersParam = queryParams.filters;

    const {
      page = 1,
      pageIndex = 0,
      pageSize = 10,
      search,
      sortKey = "createdAt",
      sortOrder = "desc",
    } = parseSearchParams(queryParams);

    let orderBy;

    if (sortKey && sortKey in drizzleSchema) {
      switch (sortOrder) {
        case "asc":
          orderBy = asc(drizzleSchema[sortKey as keyof typeof drizzleSchema]);
          break;
        case "desc":
          orderBy = desc(drizzleSchema[sortKey as keyof typeof drizzleSchema]);
          break;
        default:
          break;
      }
    }

    let filters: Array<Filter> = [];

    if (filtersParam) {
      try {
        filters = JSON.parse(filtersParam);
      } catch (error) {
        return NextResponse.json(
          { message: "Invalid filters format" },
          { status: 400 }
        );
      }
    }

    const whereClause = [];

    for (const filter of filters) {
      if (!filter.column && !filter.operator && !filter.value) continue;
      if (!(filter.operator in OPERATOR_MAP)) {
        throw new Error("operator invalid");
      }
      const op = OPERATOR_MAP[filter.operator as keyof typeof OPERATOR_MAP];
      const col = drizzleSchema[filter.column];
      let parsedValue;
      if (col.dataType === "date" && filter.operator !== "Contains") {
        parsedValue = new Date(filter.value);
      } else if (filter.operator.startsWith("Contains")) {
        parsedValue = `%${filter.value}%`;
      } else {
        parsedValue = filter.value;
      }

      whereClause.push(op(drizzleSchema[filter.column], parsedValue));
    }

    const count = await db.$count(drizzleSchema, and(...whereClause));

    const data = await db.query[curTable].findMany({
      limit: pageSize,
      offset: pageIndex * pageSize,
      orderBy: orderBy,
      where: and(...whereClause),
    });
    return NextResponse.json({ count: count, data: data });
  });
}

export function PUT_ROUTE(config: DrizzleCmsConfig) {
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
    const drizzleSchema = schema.drizzleTable;

    const obj = getEmptyDrizzleObject(drizzleSchema);

    const updateSchema = createUpdateSchema(drizzleSchema);

    const validatedFields = updateSchema.safeParse({ ...obj, ...body });

    if (!validatedFields.success) {
      return NextResponse.json(validatedFields.error.flatten().fieldErrors, {
        status: 400,
      });
    }

    if (!(curTable in db.query)) {
      console.error(`invalid resource ${curTable}`);
      return NextResponse.json(
        { message: `invalid resource ${curTable}` },
        { status: 500 }
      );
    }

    await db
      .update(drizzleSchema)
      .set(validatedFields.data)
      .where(eq(drizzleSchema.id, id));
    return NextResponse.json({ message: `Update success` });
  });
}

export function PATCH_ROUTE(config: DrizzleCmsConfig) {
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

export function DELETE_ROUTE(config: DrizzleCmsConfig) {
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
    const drizzleSchema = schema.drizzleTable;

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
