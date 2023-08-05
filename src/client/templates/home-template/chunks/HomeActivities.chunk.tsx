import Link from "next/link";
import React from "react";

export class HomeActivitiesChunk {
  static Default() {
    const props = HomeActivitiesChunk.Use();
    return <HomeActivitiesChunk.UI {...props} />;
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
                className="flex gap-20 rounded-lg py-4 text-white"
                style={{
                  backgroundColor: props.themes[i % props.themes.length],
                }}
              >
                <div className="flex items-center">
                  <div className="border-r border-white px-8 py-1 text-center">
                    <p className="font-bold leading-none"> {ev.month} </p>
                    <h6 className="font-clash text-3xl font-bold">{ev.day}</h6>
                  </div>
                  <div className="px-5">
                    <p className="font-medium">
                      {ev.startTime} - {ev.endTime}
                    </p>
                    <p className="font-semibold"> {ev.location} </p>
                  </div>
                </div>

                <div>
                  <h5 className="max-w-[400px] font-clash text-xl font-semibold">
                    {ev.title}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  static Use() {
    const themes = ["#048147", "#D91935", "#538CD1", "#9452A1", "#F9B353"];
    const events = [
      {
        id: 1,
        day: 14,
        month: "Jul",
        startTime: "09:00",
        endTime: "16:00",
        location: "Online",
        title: "2nd July Virtual Guest Lecture Presentation",
      },
      {
        id: 2,
        day: 15,
        month: "Jul",
        startTime: "10:00",
        endTime: "15:00",
        location: "Ikoyi, Lagos",
        title: "2nd July Guest Lecture Presentation, Lagos Edition",
      },
      {
        id: 3,
        day: 14,
        month: "Jul",
        startTime: "09:00",
        endTime: "16:00",
        location: "Online",
        title: "2nd July Virtual Guest Lecture Presentation",
      },
      {
        id: 4,
        day: 15,
        month: "Jul",
        startTime: "10:00",
        endTime: "15:00",
        location: "Ikoyi, Lagos",
        title: "2nd July Guest Lecture Presentation, Lagos Edition",
      },
      {
        id: 5,
        day: 14,
        month: "Jul",
        startTime: "09:00",
        endTime: "16:00",
        location: "Online",
        title: "2nd July Virtual Guest Lecture Presentation",
      },
      {
        id: 6,
        day: 15,
        month: "Jul",
        startTime: "10:00",
        endTime: "15:00",
        location: "Ikoyi, Lagos",
        title: "2nd July Guest Lecture Presentation, Lagos Edition",
      },
    ];
    return { events, themes };
  }
}

export namespace HomeActivitiesChunk {
  export type Props = ReturnType<typeof HomeActivitiesChunk.Use>;
}
