import { Avatar } from "@/src/components/ui/avatar";

export function AvatarDemo() {
  return (
    <div className="flex gap-5">
      <Avatar src="https://drizzlenext.github.io/drizzle-assets/avatar.png">
        TL
      </Avatar>
      <Avatar>TL</Avatar>
    </div>
  );
}
