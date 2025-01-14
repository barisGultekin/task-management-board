"use client"; // Marks the layout as a Client Component

import "./globals.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Task Manager</title>
        <meta name="description" content="A task management board app." />
      </head>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}