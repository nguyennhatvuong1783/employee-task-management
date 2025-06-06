import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phone verification",
};

export default function VerifyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
