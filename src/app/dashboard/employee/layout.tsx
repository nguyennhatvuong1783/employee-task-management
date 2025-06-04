import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee Management",
};

export default function EmployeeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
