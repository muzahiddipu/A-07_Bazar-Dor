import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import NavLinks from "@/components/NavLinks";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import AuthToast from "@/components/AuthToast";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর | প্রতিদিনের বাজারদর",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারভিত্তিক আজকের দাম।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={` ${hindSiliguri.className} h-full antialiased`}
    >
      <body className=" min-h-full flex flex-col">
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3500,
            style: {
              background: "#ecfdf3",
              color: "#14532d",
              border: "1px solid #86efac",
              borderRadius: "16px",
              padding: "14px 18px",
              boxShadow: "0 8px 24px rgba(22, 101, 52, 0.14)",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#15803d",
                secondary: "#ecfdf3",
              },
            },
            error: {
              iconTheme: {
                primary: "#15803d",
                secondary: "#ecfdf3",
              },
            },
            loading: {
              iconTheme: {
                primary: "#15803d",
                secondary: "#ecfdf3",
              },
            },
          }}
        />

        <AuthToast />
        <Header>
          <NavLinks />
        </Header>
        <Marquee></Marquee>
        <main className="flex-1">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
