import { Alert } from "@/components/ui/alert";

export function AlertDemo() {
  return (
    <div className="flex flex-col gap-5">
      <Alert>Default</Alert>
      <Alert variant="primary">Primary</Alert>
      <Alert variant="info">Info</Alert>
      <Alert variant="success">Success</Alert>
      <Alert variant="warning">Warning</Alert>
      <Alert variant="danger">Danger</Alert>
      <Alert variant="muted">Muted</Alert>
    </div>
  );
}
