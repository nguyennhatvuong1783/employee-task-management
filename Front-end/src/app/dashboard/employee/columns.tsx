"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/types/employees";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { AddEditEmployee } from "@/components/Dialog/add-edit-employee";
import { DeleteEmployee } from "@/components/AlertDialog/delete-employee";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-bold"
        >
          Employee Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const employee = row.original;
      return <span className="ml-4">{employee.name}</span>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-bold"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const employee = row.original;
      return <span className="ml-4">{employee.email}</span>;
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-bold"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");
      return (
        <span
          className={`ml-4 inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <span className="font-bold">Action</span>,
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <div className="flex items-center gap-2">
          <AddEditEmployee type="edit" data={employee} />
          <DeleteEmployee employee={employee} />
        </div>
      );
    },
  },
];
