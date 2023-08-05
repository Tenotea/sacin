import Head from "next/head";
import HomeTemplate from "~/client/templates/home-template/home.template";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          SACIN - Society for Automation Control and Instrumentation of Nigeria
        </title>
        <meta
          name="description"
          content="promoting the science and technology of control systems in all its ramifications"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeTemplate />
    </>
  );
}
