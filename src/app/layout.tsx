import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A task management board app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
