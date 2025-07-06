import "./globals.css";
import { Navbar } from "../components/ui/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`min-h-screen flex flex-col`}>
          <Toaster richColors />
          <div className="sticky top-0 z-50 bg-white shadow" >
            <Navbar />
          </div>
         
          <div className="flex-1 w-full pt-35">
            <main className="max-w-6xl mx-auto">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
