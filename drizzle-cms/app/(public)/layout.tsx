import { PublicLayout } from "@/components/layouts/public/public-layout";
import { PublicHeader } from "@/components/layouts/public/public-header";
import { PublicContent } from "@/components/layouts/public/public-content";
import { PublicFooter } from "@/components/layouts/public/public-footer";
import { FlashMessage } from "@/components/ui/flash-message";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PublicLayout>
      <PublicHeader />
      <PublicContent>
        <FlashMessage />
        {children}
      </PublicContent>
      <PublicFooter />
    </PublicLayout>
  );
}

export const dynamic = "force-dynamic";
