import { Mate_SC } from "next/font/google";
import localFont from "next/font/local";

export const mate_sc = Mate_SC({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mate-sc",
});

export const clashDisplay = localFont({
  src: [
    {
      path: "./clash-display/ClashDisplay-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
});

export const gilroy = localFont({
  src: [
    {
      path: "./gilroy/Gilroy-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./gilroy/Gilroy-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
    {
      path: "./gilroy/Gilroy-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./gilroy/Gilroy-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./gilroy/Gilroy-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./gilroy/Gilroy-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./gilroy/Gilroy-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./gilroy/Gilroy-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./gilroy/Gilroy-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./gilroy/Gilroy-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./gilroy/Gilroy-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./gilroy/Gilroy-RegularItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./gilroy/Gilroy-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./gilroy/Gilroy-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./gilroy/Gilroy-UltraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./gilroy/Gilroy-UltraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./gilroy/Gilroy-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./gilroy/Gilroy-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-gilroy",
});

export const charter = localFont({
  src: [
    {
      path: "./charter/charter_bold-webfont.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./charter/charter_bold_italic-webfont.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./charter/charter_regular-webfont.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./charter/charter_italic-webfont.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-charter",
});
