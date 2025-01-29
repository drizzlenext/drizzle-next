import { FlashMessage } from "@/components/ui/flash-message";
import Link from "next/link";

export function FlashMessageDemo() {
  return (
    <div>
      <FlashMessage />
      <Link href="/components/flash-message?notice=hello world">
        Click here
      </Link>
    </div>
  );
}
