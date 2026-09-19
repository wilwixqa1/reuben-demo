import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ruben Yosopov — Suffolk County Real Estate | Licensed Associate Broker",
  description: "Ruben Yosopov is a licensed associate real estate broker serving Suffolk County, Long Island and Queens. 16 years experience, 205+ transactions. Call (347) 724-2733.",
  keywords: "Ronkonkoma real estate, Lake Ronkonkoma homes, Suffolk County realtor, Holbrook NY, Centereach real estate, Long Island real estate, Ruben Yosopov",
  openGraph: {
    title: "Ruben Yosopov — Suffolk County Real Estate",
    description: "16 years, 205+ sales, $674K average. Your local Suffolk County expert. (347) 724-2733.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f4f0eb] text-[#2c3038]">{children}</body>
    </html>
  );
}
