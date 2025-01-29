import { Select, SelectOption } from "@/components/ui/select";

export function SelectDemo() {
  return (
    <Select name="color">
      <SelectOption value="red">Red</SelectOption>
      <SelectOption value="blue">Blue</SelectOption>
      <SelectOption value="yellow">Yellow</SelectOption>
    </Select>
  );
}
