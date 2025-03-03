import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center">
        <main className="flex flex-col flex-1 gap-5 w-96 m-auto justify-center">
          <h1 className="text-4xl font-mono flex gap-2 items-center">
            Drizzle Admin Example
          </h1>
          <Link href="/admin">Admin Dashboard</Link>
        </main>
      </div>
    </div>
  );
}
