import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableRowActions,
} from "@/components/ui/table";
import { Sortable } from "@/components/ui/sortable";
import { CategoriesWithRelationsList } from "@/queries/category-queries";

export function CategoryTable({ categoryList }: { categoryList: CategoriesWithRelationsList }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead><Sortable column="id">Id</Sortable></TableHead>
          <TableHead><Sortable column="name">Name</Sortable></TableHead>
          <TableHead><Sortable column="createdAt">Created At</Sortable></TableHead>
          <TableHead><Sortable column="updatedAt">Updated At</Sortable></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { categoryList.map((categoryObj) => (
          <TableRow key={ categoryObj.id }>
            <TableCell>{ categoryObj.id }</TableCell>
            <TableCell>{ categoryObj.name }</TableCell>
            <TableCell>{ categoryObj.createdAt?.toLocaleString() }</TableCell>
            <TableCell>{ categoryObj.updatedAt?.toLocaleString() }</TableCell>
            <TableCell>
              <TableRowActions>
                <Link href={`/admin/categories/${ categoryObj.id }`}>
                  View
                </Link>
                <Link href={`/admin/categories/${ categoryObj.id }/edit`}>
                  Edit
                </Link>
                <Link href={`/admin/categories/${ categoryObj.id }/delete`}>
                  Delete
                </Link>
              </TableRowActions>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
