"use client";

import type { Employee } from "@/types/employees";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import useSWR from "swr";
import { fetcher } from "@/lib/api";

export default function Employee() {
  const { data, error, isLoading } = useSWR<Employee[]>(`employee`, fetcher);

  if (error) return <div className="mx-4">Failed to load employees</div>;
  if (isLoading) return <div className="mx-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4 pt-0">
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}
