import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A corporis
        sapiente consectetur, exercitationem veritatis asperiores maiores
        nostrum magnam dicta excepturi cupiditate? Voluptas quod dolores
        officiis fugit sapiente, voluptatibus ad iste.
      </CardContent>
      <CardFooter>Card Footer</CardFooter>
    </Card>
  );
}
