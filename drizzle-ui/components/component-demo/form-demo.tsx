import { Form, FormControl, FormMessage } from "@/src/components/ui/form";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

export function FormDemo() {
  return (
    <Form>
      <FormControl>
        <Label>Label</Label>
        <Input />
        <FormMessage>A form message.</FormMessage>
      </FormControl>
      <FormControl>
        <Button>Submit</Button>
      </FormControl>
    </Form>
  );
}
