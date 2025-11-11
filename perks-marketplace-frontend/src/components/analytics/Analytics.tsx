"use client";

import Script from "next/script";
import React from "react";

const GA_MEASUREMENT_ID = "G-VB3LXQVVGH"; // 🔹 Replace with your actual GA ID

export default function Analytics(): JSX.Element {
  return (
    <>
      {/* Load Google Analytics script */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />

      {/* Initialize Google Analytics */}
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Get client ID from cookie
          function getClientId() {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
              const [name, value] = cookie.trim().split('=');
              if (name === 'ga_client_id') {
                return value;
              }
            }
            return null;
          }

          const clientId = getClientId();

          gtag('config', '${GA_MEASUREMENT_ID}', {
            client_id: clientId,
            custom_map: {
              custom_parameter_1: 'client_id'
            }
          });

          // Make available globally for fetch calls
          window.analyticsHeaders = {
            'Content-Type': 'application/json',
            'X-Client-ID': clientId
          };
        `}
      </Script>
    </>
  );
}
