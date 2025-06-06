import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { Employee } from "@/types/employees";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

export function UserItem() {
  return (
    <ScrollArea className="h-[calc(100vh-80px)] w-100 rounded-md border shadow-sm">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">All Message</h4>
        {data.map((employee) => (
          <React.Fragment key={employee.id}>
            <Button variant="ghost" size="lg" className="w-full">
              <Avatar className="h-8 w-8">
                <AvatarImage alt={employee.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{employee.name}</span>
                <span className="truncate text-xs">{employee.email}</span>
              </div>
            </Button>
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
