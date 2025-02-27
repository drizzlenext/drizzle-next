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
import { UsersWithRelationsList } from "@/queries/user-queries";

export function UserTable({ userList }: { userList: UsersWithRelationsList }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead><Sortable column="id">Id</Sortable></TableHead>
          <TableHead><Sortable column="name">Name</Sortable></TableHead>
          <TableHead><Sortable column="email">Email</Sortable></TableHead>
          <TableHead><Sortable column="emailVerified">Email Verified</Sortable></TableHead>
          <TableHead><Sortable column="image">Image</Sortable></TableHead>
          <TableHead><Sortable column="role">Role</Sortable></TableHead>
          <TableHead><Sortable column="password">Password</Sortable></TableHead>
          <TableHead><Sortable column="createdAt">Created At</Sortable></TableHead>
          <TableHead><Sortable column="updatedAt">Updated At</Sortable></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { userList.map((userObj) => (
          <TableRow key={ userObj.id }>
            <TableCell>{ userObj.id }</TableCell>
            <TableCell>{ userObj.name }</TableCell>
            <TableCell>{ userObj.email }</TableCell>
            <TableCell>{ userObj.emailVerified?.toLocaleString() }</TableCell>
            <TableCell>{ userObj.image }</TableCell>
            <TableCell>{ userObj.role }</TableCell>
            <TableCell>{ userObj.password }</TableCell>
            <TableCell>{ userObj.createdAt?.toLocaleString() }</TableCell>
            <TableCell>{ userObj.updatedAt?.toLocaleString() }</TableCell>
            <TableCell>
              <TableRowActions>
                <Link href={`/admin/users/${ userObj.id }`}>
                  View
                </Link>
                <Link href={`/admin/users/${ userObj.id }/edit`}>
                  Edit
                </Link>
                <Link href={`/admin/users/${ userObj.id }/delete`}>
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
