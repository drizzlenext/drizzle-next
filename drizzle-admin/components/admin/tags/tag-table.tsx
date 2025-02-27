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
import { TagsWithRelationsList } from "@/queries/tag-queries";

export function TagTable({ tagList }: { tagList: TagsWithRelationsList }) {
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
        { tagList.map((tagObj) => (
          <TableRow key={ tagObj.id }>
            <TableCell>{ tagObj.id }</TableCell>
            <TableCell>{ tagObj.name }</TableCell>
            <TableCell>{ tagObj.createdAt?.toLocaleString() }</TableCell>
            <TableCell>{ tagObj.updatedAt?.toLocaleString() }</TableCell>
            <TableCell>
              <TableRowActions>
                <Link href={`/admin/tags/${ tagObj.id }`}>
                  View
                </Link>
                <Link href={`/admin/tags/${ tagObj.id }/edit`}>
                  Edit
                </Link>
                <Link href={`/admin/tags/${ tagObj.id }/delete`}>
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
