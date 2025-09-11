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
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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

  const API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://strapi-backend-4xxv.onrender.com").replace(/\/$/, "");

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
        `${API_URL}/api/user-details?${params.toString()}`
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
    <div className="min-h-screen bg-background text-foreground p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card rounded-2xl shadow border border-border p-8 transition-colors duration-300">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-muted-foreground">
              Manage user information and view all registered users.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search users by name, address, branch, account number, or IFSC..."
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className="w-full pl-10 bg-muted text-foreground border-border placeholder:text-muted-foreground focus-visible:ring-blue-500 transition-colors duration-300"
              />
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Total Users: {users.length}
            </p>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border overflow-x-auto transition-colors duration-300">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead
                    onClick={() => handleSort("name")}
                    className="cursor-pointer font-semibold py-4"
                  >
                    Name{" "}
                    {sortField === "name"
                      ? sortOrder === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>IFSC</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead
                    onClick={() => handleSort("joining_date")}
                    className="cursor-pointer font-semibold"
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
                    className="bg-background hover:bg-muted/50 border-b border-border transition-colors duration-300"
                  >
                    <TableCell className="font-medium">{user.name || "-"}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      {user.date_of_birth
                        ? new Date(user.date_of_birth).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "-"}
                    </TableCell>
                    <TableCell
                      className="text-muted-foreground max-w-xs truncate"
                      title={user.address}
                    >
                      {user.address || "-"}
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono">
                      {user.bank_account_number
                        ? maskAccountNumber(user.bank_account_number)
                        : "-"}
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono">
                      {user.ifsc_code || "-"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.branch || "-"}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
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
              className="bg-muted text-foreground hover:bg-muted/70"
            >
              Previous
            </Button>
            <span className="text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              variant="secondary"
              className="bg-muted text-foreground hover:bg-muted/70"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
