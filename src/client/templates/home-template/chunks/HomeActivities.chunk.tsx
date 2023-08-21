import { Event } from "@prisma/client";
import Link from "next/link";
import React from "react";

export class HomeActivitiesChunk {
  static Default(props: HomeActivitiesChunk.HookParams) {
    const hook = HomeActivitiesChunk.Use(props);
    return <HomeActivitiesChunk.UI {...hook} />;
  }
  static UI(props: HomeActivitiesChunk.Props) {
    return (
      <section className="">
        <div className="mx-auto w-11/12 max-w-[1400px] py-16">
          <div className="flex items-center justify-between">
            <h2 className="font-clash text-3xl font-semibold">Activities</h2>
            <Link href="/activities">View All</Link>
          </div>

          <div className="mt-12 grid gap-5">
            {props.events.map((ev, i) => (
              <div
                key={ev.id}
                className="flex grid-cols-5 gap-5 rounded-lg px-5 py-4 text-white md:gap-8 md:px-8"
                style={{
                  backgroundColor: props.themes[i % props.themes.length],
                }}
              >
                <div className="col-span-2 flex items-center justify-center">
                  <div className="w-[35px] py-1 text-center">
                    <p className="text-xs font-bold leading-none md:text-base">
                      {ev.month}
                    </p>
                    <h6 className="font-clash text-3xl font-bold">{ev.day}</h6>
                  </div>
                </div>

                <div className="col-span-3 border-l border-white pl-5 md:pl-8">
                  <h5 className="max-w-[400px] font-clash font-semibold md:text-lg">
                    {ev.title}
                  </h5>
                  <div className="mt-4 flex items-center gap-5">
                    <p className="text-xs font-medium md:text-sm">
                      {ev.startTime} - {ev.endTime}
                    </p>
                    <p className="text-xs font-semibold md:text-sm">
                      {ev.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  static Use(params: HomeActivitiesChunk.HookParams) {
    const themes = ["#048147", "#D91935", "#538CD1", "#9452A1", "#F9B353"];
    const events = params.events.map((e) => ({
      id: e.id,
      day: e.day,
      month: e.month,
      startTime: e.startsAt,
      endTime: e.endsAt,
      location: e.location,
      title: e.title,
    }));

    return { events, themes };
  }
}

export namespace HomeActivitiesChunk {
  export type HookParams = { events: Event[] };

  export type Props = ReturnType<typeof HomeActivitiesChunk.Use>;
}
