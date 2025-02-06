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
import { PostsWithRelationsList } from "@/queries/post-queries";

export function PostTable({ postList }: { postList: PostsWithRelationsList }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead><Sortable column="id">Id</Sortable></TableHead>
          <TableHead><Sortable column="title">Title</Sortable></TableHead>
          <TableHead><Sortable column="categoryId">Category Id</Sortable></TableHead>
          <TableHead><Sortable column="content">Content</Sortable></TableHead>
          <TableHead><Sortable column="isPublished">Is Published</Sortable></TableHead>
          <TableHead><Sortable column="createdAt">Created At</Sortable></TableHead>
          <TableHead><Sortable column="updatedAt">Updated At</Sortable></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { postList.map((postObj) => (
          <TableRow key={ postObj.id }>
            <TableCell>{ postObj.id }</TableCell>
            <TableCell>{ postObj.title }</TableCell>
            <TableCell>{ postObj.categoryId }</TableCell>
            <TableCell>{ postObj.content }</TableCell>
            <TableCell>{ postObj.isPublished ? "true" : "false" }</TableCell>
            <TableCell>{ postObj.createdAt?.toLocaleString() }</TableCell>
            <TableCell>{ postObj.updatedAt?.toLocaleString() }</TableCell>
            <TableCell>
              <TableRowActions>
                <Link href={`/admin/posts/${ postObj.id }`}>
                  View
                </Link>
                <Link href={`/admin/posts/${ postObj.id }/edit`}>
                  Edit
                </Link>
                <Link href={`/admin/posts/${ postObj.id }/delete`}>
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
