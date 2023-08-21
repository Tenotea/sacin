import React from "react";
import { HomeHeroChunk } from "~/client/chunks/HomeHeroChunk";
import { HomeActivitiesChunk } from "./chunks/HomeActivities.chunk";
import { HomeArticlesChunk } from "./chunks/HomeArticles.chunk";
import { AboutUsChunk } from "~/client/chunks/AboutUsChunk";
import { PageFooterChunk } from "~/client/chunks/PageFooterChunk";
import { Event } from "@prisma/client";

export default function HomeTemplate(props: { events: Event[] }) {
  const homeHeroChunk = HomeHeroChunk.use();
  return (
    <section>
      <HomeHeroChunk.UI {...homeHeroChunk} />
      <HomeActivitiesChunk.Default events={props.events} />
      <HomeArticlesChunk.Default />
      <AboutUsChunk.Default />
      <PageFooterChunk.Default />
    </section>
  );
}
