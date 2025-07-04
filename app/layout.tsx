import "./globals.css";
import { Navbar } from "./components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col`}
      >
        <Navbar/>
        <div className="flex-1 w-full" >
          <main className="max-w-6xl mx-auto" >
            {children}
          </main>
        </div>
        
      </body>
    </html>
  );
}
