import { Icon } from "@iconify/react";
import { Event } from "@prisma/client";
import Link from "next/link";
import React from "react";
import EventsList from "~/client/components/events-list/EventsList";

export class HomeActivitiesChunk {
  static Default(props: HomeActivitiesChunk.HookParams) {
    const hook = HomeActivitiesChunk.Use(props);
    return <HomeActivitiesChunk.UI {...hook} />;
  }
  static UI(props: HomeActivitiesChunk.Props) {
    return (
      <section className="">
        <div className="mx-auto w-11/12 max-w-[1400px] py-16">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="font-clash text-3xl font-semibold">Activities</h2>
            <Link href="/activities">View All</Link>
          </div>

          <EventsList events={props.events} />
        </div>
      </section>
    );
  }
  static Use(params: HomeActivitiesChunk.HookParams) {
    return { events: params.events };
  }
}

export namespace HomeActivitiesChunk {
  export type HookParams = { events: Event[] };

  export type Props = ReturnType<typeof HomeActivitiesChunk.Use>;
}
