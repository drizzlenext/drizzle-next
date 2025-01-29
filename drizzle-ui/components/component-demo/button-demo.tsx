import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <div className="flex gap-5">
      <Button variant="primary">Primary</Button>
      <Button variant="muted">Muted</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="info">Info</Button>
    </div>
  );
}
