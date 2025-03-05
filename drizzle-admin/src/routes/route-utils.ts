import { NextRequest, NextResponse } from "next/server";
import { getTableColumns } from "drizzle-orm";

export function getEmptyDrizzleObject(drizzleSchema: any) {
  const cols = getTableColumns(drizzleSchema);
  const obj: { [key: string]: any } = {};
  for (const key in cols) {
    if (["id", "createdAt", "updatedAt"].includes(key)) continue;
    obj[key] = null;
  }
  return obj;
}

export function withErrorHandling(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async function (request: NextRequest) {
    try {
      return await handler(request);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  };
}
