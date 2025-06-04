import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real-Time Message",
};

export default function MessageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
