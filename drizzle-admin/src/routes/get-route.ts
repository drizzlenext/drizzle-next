import { NextRequest, NextResponse } from "next/server";
import { DrizzleAdminConfig, Filter } from "../types/types";
import { and, asc, desc, eq } from "drizzle-orm";
import { parseSearchParams } from "../lib/server-utils";
import { OPERATOR_MAP } from "../lib/server-constants";
import { withErrorHandling } from "./route-utils";

export function GET_ROUTE(config: DrizzleAdminConfig) {
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

    const whereClause: any = [];

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
