import { Avatar } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { GhostIcon, RocketIcon } from "lucide-react";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-5">
      <Button>Default</Button>
      <Button variant="muted">Muted</Button>
      <Button variant="success">Success</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="info">Info</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="icon" variant="ghost">
        <GhostIcon />
      </Button>
      <Button size="icon">
        <RocketIcon />
      </Button>
      <Button size="avatar" variant="ghost">
        <Avatar src="https://drizzlenext.github.io/drizzle-assets/avatar.png" />
      </Button>
    </div>
  );
}
