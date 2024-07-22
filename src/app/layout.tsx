import { Lato } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import MobileHeader from "@/components/ui/MobileHeader";
import Sidebar from "@/components/ui/Sidebar";
import SignupBanner from "@/components/ui/SignupBanner";
import DesktopHeader from "@/components/ui/DesktopHeader";
import WithScrollbar from "@/components/layout/WithScrollbar";
import "overlayscrollbars/overlayscrollbars.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/lib/mantine";
import IntersectionObserverHelper from "../components/layout/IntersectionObserverHelper";

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
      <head>
        <ColorSchemeScript />
      </head>
      <body className={cn(lato.className, "bg-neutral-900 text-neutral-100")}>
        <MantineProvider theme={theme}>
          <div className="min-h-full">
            <MobileHeader />
            <div className="px-4 py-2 md:grid md:h-[calc(100dvh_-_5.4rem)] md:grid-cols-[350px_1fr] md:gap-3 md:px-3 md:py-3">
              <Sidebar />
              <WithScrollbar
                className="relative h-full rounded-lg bg-neutral-800"
                id="intersection-root"
              >
                <IntersectionObserverHelper>
                  {children}
                </IntersectionObserverHelper>
              </WithScrollbar>
            </div>
            <SignupBanner />
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
