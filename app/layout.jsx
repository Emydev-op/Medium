import { Inter } from "next/font/google";
import "./globals.css";
//Components
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Medium Blog",
  description: "Get the lasted tech Info anytime, anywhere.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-6xl mx-auto">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
