import { Lato } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(lato.className, "bg-neutral-900 text-neutral-100")}>
        {children}
      </body>
    </html>
  );
}
