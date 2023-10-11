import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { charter, clashDisplay, gilroy, mate_sc } from "~/client/assets/fonts";

export default function Document() {
  return (
    <Html
      lang="en"
      className={`${mate_sc.variable} ${clashDisplay.variable} ${gilroy.variable} ${charter.variable}`}
    >
      <Head>
        <title>
          SACIN - Society for Automation Control and Instrumentation of Nigeria
        </title>
        <meta
          name="description"
          content="To promote the science and technology of automation, control and instrumentation through organization of seminars, technical meetings, publications and others means in line with the objectives of SACIN"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
