import { auth } from "@/lib/auth";
import {
  PageLayout,
  PageHeader,
  PageTitle,
  PageContent,
} from "@/components/ui/page-layout";

export default async function Page() {
  const session = await auth();
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Profile</PageTitle>
      </PageHeader>
      <PageContent>
        <strong>Email:</strong> {session?.user?.email}
      </PageContent>
    </PageLayout>
  );
}
