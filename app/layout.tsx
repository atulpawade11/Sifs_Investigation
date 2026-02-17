import { ReactNode } from 'react'; 
import { Lato } from "next/font/google";
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';


// Configure Lato
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato", 
});

export default function RootLayout({
  children,
}: {
  children: ReactNode; 
}) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome CDN Link */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
        />
      </head>
      <body className={`${lato.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
