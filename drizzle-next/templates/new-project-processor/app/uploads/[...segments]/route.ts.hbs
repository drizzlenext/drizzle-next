import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import mime from "mime";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ segments: string[] }>;
  },
) {
  const { segments } = await params;
  const filePath = path.resolve(process.cwd(), `uploads/${segments.join("/")}`);
  if (!fs.existsSync(filePath)) {
    return new NextResponse("not found", { status: 400 });
  }
  const buffer = fs.readFileSync(filePath);
  const contentType = mime.getType(filePath) || "application/octet-stream";
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `inline; filename="${segments}"`,
    },
  });
}
