import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  title: "MartialArtsJobsBoard.com | Where Schools Hire & Instructors Find Work",
  description: "The #1 Job Board for Martial Arts Instructors",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
