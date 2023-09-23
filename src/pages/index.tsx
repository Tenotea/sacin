import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import HomeTemplate from "~/client/templates/home-template/home.template";
import { EventsService } from "~/server/services/events.service";

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
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
      <HomeTemplate {...props} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<EventsService.GetMostRecentEventsDAO> =
  async function () {
    try {
      let events = await EventsService.GetUpcomingEvents();
      events = events.map((e) => ({
        ...e,
        updatedAt: e.updatedAt.toISOString() as unknown as Date,
        createdAt: e.createdAt.toISOString() as unknown as Date,
      }));
      return { props: { events } };
    } catch (error) {
      return { props: { events: [] } };
    }
  };
