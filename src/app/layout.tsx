// Here is the main part of the web application. Everything will be rendared form here
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import NavLinks from "@/components/NavLinks";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Shared metadata, Bengali font, site navigation, ticker, and page landmarks.
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
        {/* React hot toast */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fbfdfb",
              color: "#202a22",
              border: "1px solid #dfe8df",
              borderRadius: "16px",
              padding: "14px 18px",
              boxShadow: "0 8px 24px rgba(7, 136, 63, 0.10)",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#07883f",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#dc2626",
                secondary: "#ffffff",
              },
            },
          }}
        />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#fbfdfb",
              color: "#202a22",
              border: "1px solid #dfe8df",
              borderRadius: "16px",
              padding: "14px 18px",
              boxShadow: "0 8px 24px rgba(7, 136, 63, 0.10)",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#07883f",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#dc2626",
                secondary: "#ffffff",
              },
            },
            loading: {
              iconTheme: {
                primary: "#07883f",
                secondary: "#eaf2ea",
              },
            },
          }}
        />

        {/* Global site navigation */}
        <Header>
          <NavLinks />
        </Header>
        {/* Current product price ticker */}
        <Marquee></Marquee>
        {/* Each route renders its page content inside the main landmark */}
        <main className="flex-1">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
