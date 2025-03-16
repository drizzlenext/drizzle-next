import { Session } from "next-auth";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type Role = "admin" | "user";

export async function authorize(role: Role): Promise<Session> {
  const session = await auth();

  if (role === "admin") {
    if (!session?.user?.id) {
      redirect("/admin-signin");
    }
    if (session.user.role !== "admin") {
      throw new Error("unauthorized");
    }
  } else if (role === "user") {
    if (!session?.user?.id) {
      redirect("/signin");
    }
    if (!["admin", "user"].includes(session.user.role)) {
      throw new Error("unauthorized");
    }
  } else {
    throw new Error(`unknown role ${role}`);
  }

  return session;
}
