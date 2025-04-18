import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

const data = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: "coffee",
  price: 5,
  description: "A hot beverage made from roasted coffee beans",
  category: "Beverage",
}));

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.category}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
