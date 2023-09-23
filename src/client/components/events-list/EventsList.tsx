import { Icon } from "@iconify/react";
import { Event } from "@prisma/client";
import React from "react";

type EventsListProps = {
  events: Event[];
};

export default function EventsList(props: EventsListProps) {
  const themes = ["#048147", "#D91935", "#538CD1", "#9452A1", "#F9B353"];
  return (
    <div className="grid gap-5">
      {props.events.map((ev, i) => (
        <div
          tabIndex={0}
          key={ev.id}
          className="flex grid-cols-5 gap-5 rounded-lg px-5 py-4 text-white md:gap-8 md:px-8"
          style={{
            backgroundColor: themes[i % themes.length],
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
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <p className="flex items-center gap-1 text-xs font-medium md:text-sm">
                <Icon icon={"mingcute:time-fill"} width={16} /> {ev.startsAt} -{" "}
                {ev.endsAt}
              </p>
              <p className="flex items-center gap-1 text-xs font-semibold md:text-sm">
                <Icon icon={"fluent:location-28-filled"} width={16} />{" "}
                {ev.location}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
