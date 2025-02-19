import { Alert } from "@/components/ui/alert";
import {
  CheckIcon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";

export function AlertDemo() {
  return (
    <div className="flex flex-col gap-5">
      <Alert>Default</Alert>
      <Alert variant="muted">Muted</Alert>
      <Alert variant="success">
        <CheckIcon /> Success
      </Alert>
      <Alert variant="destructive">
        <CircleXIcon /> Destructive
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon /> Warning
      </Alert>
      <Alert variant="info">
        <InfoIcon /> Info
      </Alert>
    </div>
  );
}
