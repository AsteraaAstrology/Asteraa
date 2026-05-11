import "./globals.css";
import Script from "next/script";

export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <body>

        <div id="google_translate_element"></div>

        {children}

        <Script
          strategy="afterInteractive"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />

        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new window.google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                },
                'google_translate_element'
              );
            }
          `}
        </Script>

      </body>

    </html>
  );
}