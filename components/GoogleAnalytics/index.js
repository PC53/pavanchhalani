import React from 'react';
import Script from 'next/script';

const GoogleAnalytics = () => {
  const GA_TRACKING_ID = 'G-YHK5375TFR';
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-YHK5375TFR`}
      ></Script>
      <Script
        id="google-analytics">
        
        {
          `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', 'G-YHK5375TFR');
          `
        }
      </Script>
    </>
  );
};

export default GoogleAnalytics;