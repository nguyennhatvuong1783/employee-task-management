import { Employee } from "@/types/employees";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteEmployee } from "@/lib/api";
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

interface DeleteEmployeeProps {
    employee: Employee;
}

export function DeleteEmployee({ employee }: DeleteEmployeeProps) {
    const handleDelete = async () => {
        try {
            const response = await deleteEmployee(employee);
            if (response.status !== 200) {
                Toast.fire({
                    icon: "error",
                    title: "Error deleting employee",
                });
            } else {
                Toast.fire({
                    icon: "success",
                    title: `Employee ${employee.name} deleted successfully`,
                });
                mutate("employee");
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "An error occurred while deleting the employee",
            });
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the employee
                        <span className="font-bold"> {employee.name} </span>
                        and remove them from the system.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
