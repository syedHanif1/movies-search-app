import type { Metadata } from "next";
import AppLayout from "./_components/AppLayout";
import "@/app/_styles/global.css";
  
export const metadata: Metadata = { title: "SeekMovie" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ padding: '0px', margin: '0px', }}>
        <AppLayout>{children}</AppLayout>
      </body>
  </html>
  );
}
