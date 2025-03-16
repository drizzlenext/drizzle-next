import { Alert } from "@/src/drizzle-ui";
import { ConstructionIcon } from "lucide-react";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  return (
    <div className="p-5">
      <Alert variant="muted">
        <ConstructionIcon /> Welcome to Drizzle Admin. Use this space to build a dashboard home page. <ConstructionIcon />
      </Alert>
    </div>
  );
}
