import "./globals.css";

export const metadata = {
  title: "Asteraa",
  description: "Premium Astrology Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}