import { Button } from "@/components/ui/button";
import { GhostIcon, RocketIcon } from "lucide-react";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-5">
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="muted">Muted</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="info">Info</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="icon">
        <RocketIcon />
      </Button>
      <Button size="icon" variant="ghost">
        <GhostIcon />
      </Button>
    </div>
  );
}
