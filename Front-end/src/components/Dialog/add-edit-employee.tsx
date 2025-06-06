"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Employee } from "@/types/employees";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { createEmployee } from "@/lib/api";
import Swal from "sweetalert2";
import { mutate } from "swr";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email address").optional(),
    role: z.string().refine((val) => ["employee", "owner"].includes(val), {
        message: "Role must be either 'employee' or 'owner'",
    }),
    address: z.string().optional(),
    isActive: z.boolean(),
});

interface AddEditEmployeeProps {
    type?: "add" | "edit";
    data?: Employee;
}

export function AddEditEmployee({ type = "add", data }: AddEditEmployeeProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name || "",
            phone: data?.phone || "",
            email: data?.email || "",
            role: data?.role || "employee",
            address: data?.address || "",
            isActive: data?.isActive || true,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (type === "add") {
            try {
                const response = await createEmployee(values as Employee);
                if (response.status === 200) {
                    form.reset();
                    Toast.fire({
                        icon: "success",
                        title: "Create employee successfully",
                    });
                    mutate("employee");
                }
            } catch (error) {
                Toast.fire({
                    icon: "error",
                    title: "Error creating employee",
                });
            }
        } else {
            Toast.fire({
                icon: "info",
                title: "Edit functionality is not implemented yet",
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    {type === "add" ? (
                        <>
                            <Plus className="h-4 w-4" /> Create Employee
                        </>
                    ) : (
                        <>Edit</>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {type === "add" ? "Create Employee" : "Edit Employee"}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="grid gap-3">
                                        <FormLabel htmlFor="name">
                                            Employee Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input id="name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="grid gap-3">
                                        <FormLabel htmlFor="phone">
                                            Phone Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input id="phone" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="grid gap-3">
                                        <FormLabel htmlFor="email">
                                            Email Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                type="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem className="grid gap-3">
                                        <FormLabel htmlFor="role">
                                            Role
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                name="role"
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Roles
                                                        </SelectLabel>
                                                        <SelectItem value="employee">
                                                            Employee
                                                        </SelectItem>
                                                        <SelectItem value="owner">
                                                            Owner
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="grid gap-3">
                                        <FormLabel htmlFor="address">
                                            Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input id="address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit">
                                {type === "add" ? "Create" : "Save"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
