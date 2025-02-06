import Link from "next/link";

type Params = Promise<{ [key: string]: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export type DrizzleCmsConfig = {
  schema: {
    [key: string]: {
      drizzleSchema: any;
      label: string;
      path: string;
    };
  };
};

export async function DrizzleCms(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleCmsConfig;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const config = props.config;

  const tables = Object.values(config.schema).map((schema) => ({
    label: schema.label,
    path: schema.path,
  }));

  return (
    <div>
      <div>
        {tables.map((table) => (
          <div key={table.path}>
            <Link href={`/cms/${table.path}`}>{table.label}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
