import { Lato } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import MobileHeader from "@/components/ui/MobileHeader";
import Sidebar from "@/components/ui/Sidebar";
import SignupBanner from "@/components/ui/SignupBanner";

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
        <div className="min-h-full">
          <MobileHeader />
          <div className="px-4 py-2 md:grid md:h-[calc(100dvh_-_5rem)] md:grid-cols-[350px_1fr] md:gap-4 md:px-3 md:py-3">
            <Sidebar />
            {children}
          </div>
          <SignupBanner />
        </div>
      </body>
    </html>
  );
}
