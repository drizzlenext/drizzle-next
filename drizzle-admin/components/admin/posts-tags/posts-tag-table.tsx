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
import { PostsTagsWithRelationsList } from "@/queries/posts-tag-queries";

export function PostsTagTable({ postsTagList }: { postsTagList: PostsTagsWithRelationsList }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead><Sortable column="id">Id</Sortable></TableHead>
          <TableHead><Sortable column="postId">Post Id</Sortable></TableHead>
          <TableHead><Sortable column="tagId">Tag Id</Sortable></TableHead>
          <TableHead><Sortable column="createdAt">Created At</Sortable></TableHead>
          <TableHead><Sortable column="updatedAt">Updated At</Sortable></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { postsTagList.map((postsTagObj) => (
          <TableRow key={ postsTagObj.id }>
            <TableCell>{ postsTagObj.id }</TableCell>
            <TableCell>{ postsTagObj.postId }</TableCell>
            <TableCell>{ postsTagObj.tagId }</TableCell>
            <TableCell>{ postsTagObj.createdAt?.toLocaleString() }</TableCell>
            <TableCell>{ postsTagObj.updatedAt?.toLocaleString() }</TableCell>
            <TableCell>
              <TableRowActions>
                <Link href={`/admin/posts-tags/${ postsTagObj.id }`}>
                  View
                </Link>
                <Link href={`/admin/posts-tags/${ postsTagObj.id }/edit`}>
                  Edit
                </Link>
                <Link href={`/admin/posts-tags/${ postsTagObj.id }/delete`}>
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
