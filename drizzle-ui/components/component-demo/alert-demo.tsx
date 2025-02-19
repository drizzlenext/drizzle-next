import { Alert } from "@/components/ui/alert";
import {
  CheckIcon,
  InfoIcon,
  MessageCircleIcon,
  TriangleAlertIcon,
  VolumeOffIcon,
  XIcon,
} from "lucide-react";

export function AlertDemo() {
  return (
    <div className="flex flex-col gap-5">
      <Alert>
        <MessageCircleIcon /> Default
      </Alert>
      <Alert variant="muted">
        <VolumeOffIcon /> Muted
      </Alert>
      <Alert variant="success">
        <CheckIcon /> Success
      </Alert>
      <Alert variant="destructive">
        <XIcon /> Destructive
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
