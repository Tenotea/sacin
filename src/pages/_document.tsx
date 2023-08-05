import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { charter, clashDisplay, gilroy, mate_sc } from "~/client/assets/fonts";

export default function Document() {
  return (
    <Html
      lang="en"
      className={`${mate_sc.variable} ${clashDisplay.variable} ${gilroy.variable} ${charter.variable}`}
    >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
