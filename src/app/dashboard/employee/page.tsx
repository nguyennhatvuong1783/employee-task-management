import type { Employee } from "@/types/employees";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const data: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    isActive: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    isActive: false,
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice@example.com",
    isActive: true,
  },
];

export default function Employee() {
  return (
    <div className="container mx-auto p-4 pt-0">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
