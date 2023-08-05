import { type AppType } from "next/dist/shared/lib/utils";
import { charter, clashDisplay, gilroy, mate_sc } from "~/client/assets/fonts";
import "~/client/assets/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div
      className={`${mate_sc.variable} ${clashDisplay.variable} ${gilroy.variable} ${charter.variable}`}
    >
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
