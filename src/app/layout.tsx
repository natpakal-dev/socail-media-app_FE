import type { Metadata } from "next";
import "../app/globals.css";
import Button from "../app/components/button";
export const metadata: Metadata = {
  title: "FrameBook",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="bg-[#233931] h-15 flex justify-between items-center px-4">
            <div className="w-full flex justify-between items-center">
              <p className="text-white text-lg font-semibold">FrameBook</p>
              <Button title="Sign In" />
            </div>
        </header>
        {children}
      </body>
    </html>
  );
}
