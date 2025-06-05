import type { Employee } from "@/types/employees";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const data: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "123-456-7890",
    email: "john@example.com",
    role: "employee",
    address: "123 Main St, Anytown, USA",
    isActive: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "987-654-3210",
    email: "jane@example.com",
    role: "owner",
    address: "456 Elm St, Anytown, USA",
    isActive: false,
  },
  {
    id: "3",
    name: "Alice Johnson",
    phone: "555-555-5555",
    email: "alice@example.com",
    role: "employee",
    address: "789 Oak St, Anytown, USA",
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
