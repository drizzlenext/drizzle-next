import { config } from "@/drizzle-cms.config";
import { PUT_REQUEST } from "@/package/drizzle-routes";

export async function GET(request: Request) {
  console.log(request);
  return Response.json({ message: "get" });
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const segments = url.pathname.split("/").filter(Boolean);
  console.log(segments);
  return Response.json({ message: "post" });
}

export const PUT = PUT_REQUEST(config);
