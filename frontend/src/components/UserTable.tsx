"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: number;
  attributes: {
    name: string;
    dob: string;
    address: string;
    accountNumber: string;
    ifsc: string;
    branch: string;
    joiningDate: string;
  };
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getUsers(page, 5); // fetch 5 users per page
        setUsers(res.data);
        setPageCount(res.meta.pagination.pageCount);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [page]);

return (
  <div className="bg-white shadow rounded-lg p-4">
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>DOB</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Account No</TableHead>
            <TableHead>IFSC</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Joining Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.attributes.name}</TableCell>
              <TableCell>{user.attributes.dob}</TableCell>
              <TableCell>{user.attributes.address}</TableCell>
              <TableCell>{user.attributes.accountNumber}</TableCell>
              <TableCell>{user.attributes.ifsc}</TableCell>
              <TableCell>{user.attributes.branch}</TableCell>
              <TableCell>{user.attributes.joiningDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* Pagination */}
    <div className="flex justify-between items-center mt-4">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
      >
        Previous
      </Button>
      <span>
        Page {page} of {pageCount}
      </span>
      <Button
        variant="outline"
        disabled={page === pageCount}
        onClick={() => setPage((p) => Math.min(p + 1, pageCount))}
      >
        Next
      </Button>
    </div>
  </div>
);
}
