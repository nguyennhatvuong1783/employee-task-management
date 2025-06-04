import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Management",
};

export default function TaskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
