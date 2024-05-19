import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';


const GoogleAnalytics = () => {
  const GA_TRACKING_ID = 'G-YHK5375TFR';
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log('Tracking page view for:', url);
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
    };
    // Track initial page load
    window.gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
    });

    // Track page changes
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
