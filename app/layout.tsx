import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "اختبار مادة تكنلوجيا المعلومات والابتكار",
  keywords: ["اختبار", "تكنلوجيا المعلومات", "ابتكار", "نظم معلومات الأعمال"],
  authors: [{ name: "MahmoudNasr", url: "https://github.com/mahm0udnasr" }],
  creator: "MahmoudNasr",
  description:
    "اختبار مادة تكنلوجيا المعلومات والابتكار - الفرقة الثانيه نظم معلومات الأعمال",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
