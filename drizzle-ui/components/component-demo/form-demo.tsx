import { Form, FormControl, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
