"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { validateAccessCode } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

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
    code: z.string().min(1, "Access code is required"),
});

export default function Verify() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await validateAccessCode(
                localStorage.getItem("phone") as string,
                values.code,
            );
            if (response.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: "Sign in successfully",
                });
                cookieStore.set("token", response.data.token);
                router.push("/dashboard");
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Invalid access code",
            });
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Phone verification</CardTitle>
                    <CardDescription>
                        Please enter your code that send to your phone
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">Resend Code</Button>
                    </CardAction>
                </CardHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-3">
                                            <FormLabel htmlFor="code">
                                                Verification Code
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="code"
                                                    placeholder="Enter your code"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
