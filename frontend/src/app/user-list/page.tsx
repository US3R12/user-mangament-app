"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type User = {
  id: number;
  name: string;
  date_of_birth: string;
  address: string;
  bank_account_number: string;
  ifsc_code: string;
  branch: string;
  joining_date: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof User | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const pageSize = 5;

  const fetchUsers = async (
    pageNumber = 1,
    searchTerm = "",
    sortFieldName: string = "",
    sortDirection: "asc" | "desc" = "asc"
  ) => {
    try {
      const params = new URLSearchParams();
      params.append("pagination[page]", pageNumber.toString());
      params.append("pagination[pageSize]", pageSize.toString());
      if (searchTerm) {
        params.append("filters[$or][0][name][$contains]", searchTerm);
        params.append("filters[$or][1][branch][$contains]", searchTerm);
        params.append("filters[$or][2][ifsc_code][$contains]", searchTerm);
        params.append("filters[$or][3][address][$contains]", searchTerm);
        params.append("filters[$or][4][bank_account_number][$contains]", searchTerm);
      }
      if (sortFieldName) {
        params.append("_sort", `${sortFieldName}:${sortDirection}`);
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-details?${params.toString()}`
      );
      const data = await res.json();
      setUsers(data.data);
      setTotalPages(data.meta.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(page, search, sortField, sortOrder);
  }, [page, search, sortField, sortOrder]);

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const maskAccountNumber = (accountNum: string) => {
    if (!accountNum || accountNum.length < 6) return accountNum;
    const start = accountNum.slice(0, 3);
    const end = accountNum.slice(-3);
    const middle = "*".repeat(accountNum.length - 6);
    return `${start}${middle}${end}`;
  };

  return (
    <div className="min-h-screen bg-neutral-950 dark:bg-black p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="bg-neutral-900 dark:bg-gray-900 rounded-2xl shadow border border-neutral-800 p-8 transition-colors duration-300">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-white mb-1">
              User Management
            </h1>
            <p className="text-neutral-300">
              Manage user information and view all registered users.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <Input
                placeholder="Search users by name, address, branch, account number, or IFSC..."
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className="w-full pl-10 bg-neutral-800 dark:bg-gray-800 text-white border-neutral-700 placeholder:text-neutral-400 focus-visible:ring-blue-500 transition-colors duration-300"
              />
            </div>
          </div>
          <div className="mb-4">
            <p className="text-neutral-400 text-sm">
              Total Users: {users.length}
            </p>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-neutral-700 overflow-x-auto transition-colors duration-300">
            <Table>
              <TableHeader>
                <TableRow className="bg-neutral-800 dark:bg-gray-800">
                  <TableHead
                    onClick={() => handleSort("name")}
                    className="cursor-pointer text-white font-semibold py-4"
                  >
                    Name{" "}
                    {sortField === "name"
                      ? sortOrder === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Date of Birth
                  </TableHead>
                  <TableHead className="text-white font-semibold">Address</TableHead>
                  <TableHead className="text-white font-semibold">
                    Account Number
                  </TableHead>
                  <TableHead className="text-white font-semibold">IFSC</TableHead>
                  <TableHead className="text-white font-semibold">Branch</TableHead>
                  <TableHead
                    onClick={() => handleSort("joining_date")}
                    className="cursor-pointer text-white font-semibold"
                  >
                    Joining Date{" "}
                    {sortField === "joining_date"
                      ? sortOrder === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="bg-neutral-900 dark:bg-gray-900 hover:bg-neutral-800 dark:hover:bg-gray-800 border-b border-neutral-700 transition-colors duration-300"
                  >
                    <TableCell className="text-white font-medium">
                      {user.name || "-"}
                    </TableCell>
                    <TableCell className="text-neutral-300 whitespace-nowrap">
                      {user.date_of_birth
                        ? new Date(user.date_of_birth).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "-"}
                    </TableCell>
                    <TableCell
                      className="text-neutral-300 max-w-xs truncate"
                      title={user.address}
                    >
                      {user.address || "-"}
                    </TableCell>
                    <TableCell className="text-neutral-300 font-mono">
                      {user.bank_account_number
                        ? maskAccountNumber(user.bank_account_number)
                        : "-"}
                    </TableCell>
                    <TableCell className="text-neutral-300 font-mono">
                      {user.ifsc_code || "-"}
                    </TableCell>
                    <TableCell className="text-neutral-300">{user.branch || "-"}</TableCell>
                    <TableCell className="text-neutral-300 whitespace-nowrap">
                      {user.joining_date
                        ? new Date(user.joining_date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <Button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              variant="secondary"
              className="bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700 transition-colors duration-300"
            >
              Previous
            </Button>
            <span className="text-neutral-300">
              Page {page} of {totalPages}
            </span>
            <Button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              variant="secondary"
              className="bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700 transition-colors duration-300"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
