import "./globals.css";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <div className="max-w-4xl mx-auto p-6">{children}</div>
      </body>
    </html>
  );
}
