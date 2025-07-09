import "./globals.css";
import { Navbar } from "../components/ui/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="h-full flex flex-col bg-gray-200">

          <Toaster richColors />

          <div className="sticky top-0 z-50 bg-white shadow mb-4">
            <Navbar />
          </div>

          <div className="flex-1 overflow-y-auto">
            <main className="max-w-6xl mx-auto pt-6">{children}</main>
          </div>
          
        </body>
      </html>
    </ClerkProvider>
  );
}
