import Script from "next/script";

export default function SiteHead() {
  return (
    <>
      {/* Google Analytics - Replace GA_MEASUREMENT_ID with actual ID */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
      {/* Google AdSense - Add data-ad-client when approved */}
      {/* <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" strategy="afterInteractive" /> */}
    </>
  );
}
