import React from "react";
import { HomeHeroChunk } from "~/client/chunks/HomeHeroChunk";
import { HomeActivitiesChunk } from "./chunks/HomeActivities.chunk";
import { HomeArticlesChunk } from "./chunks/HomeArticles.chunk";
import { AboutUsChunk } from "~/client/chunks/AboutUsChunk";
import { PageFooterChunk } from "~/client/chunks/PageFooterChunk";

export default function HomeTemplate() {
  const homeHeroChunk = HomeHeroChunk.use();
  return (
    <section>
      <HomeHeroChunk.UI {...homeHeroChunk} />
      <HomeActivitiesChunk.Default />
      <HomeArticlesChunk.Default />
      <AboutUsChunk.Default />
      <PageFooterChunk.Default />
    </section>
  );
}
