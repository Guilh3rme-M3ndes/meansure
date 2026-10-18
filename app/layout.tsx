import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { GithubIcon, LinkedinIcon } from "./_components/footer-icons";
import { TopHeader } from "./_components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meansure",
  description: "Bad words calculator",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col">
        <SidebarProvider defaultOpen={false}>
          <main className="flex-1 flex flex-col min-h-screen w-full">
            <TopHeader />
            <div className="flex-1 p-4">{children}</div>
            <footer className="border-t border-border p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>
                Made by{" "}
                <span className="font-medium text-foreground">
                  Guilherme Mendes
                </span>
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/Guilh3rme-M3ndes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  <GithubIcon className="w-5 h-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/guilherme-mendes-868a592ba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  <LinkedinIcon className="w-5 h-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </footer>
          </main>
          <Toaster />
          <AppSidebar />
        </SidebarProvider>
      </body>
    </html>
  );
}
