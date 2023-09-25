import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "../db";
import { Event, Month } from "@prisma/client";

export class EventsService {
  private static CreateEventGroups(events: Event[]) {
    const eventGroups = {} as Record<Month, Event[]>;
    events.forEach((ev) => {
      const monthKey = ev.month;
      if (!eventGroups[monthKey]) {
        eventGroups[monthKey] = [];
      }

      eventGroups[monthKey] = [
        ...eventGroups[monthKey],
        {
          ...ev,
          updatedAt: ev.updatedAt.toISOString() as unknown as Date,
          createdAt: ev.createdAt.toISOString() as unknown as Date,
        },
      ];
    });
    return eventGroups;
  }

  static async GetAllEvents() {
    const events = await prisma.event.findMany({
      orderBy: [{ year: "asc" }, { month: "asc" }],
    });
    return events.map((ev) => ({
      ...ev,
      updatedAt: ev.updatedAt.toISOString() as unknown as Date,
      createdAt: ev.createdAt.toISOString() as unknown as Date,
    }));
  }

  static async CreateNewEvent(req: NextApiRequest, res: NextApiResponse) {
    await z
      .object({
        title: z.string(),
        about: z.string(),
        location: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        day: z.string(),
        month: z.string(),
        year: z.string(),
      })
      .parseAsync(req.body);

    const event = await prisma.event.create({
      data: {
        title: req.body.title,
        description: req.body.about,
        location: req.body.location,
        startsAt: req.body.startTime,
        endsAt: req.body.endTime,
        day: req.body.day,
        month: req.body.month,
        year: req.body.year,
      },
    });
    return event;
  }

  static async GetUpcomingEvents() {
    const months = Object.values(Month);
    const currentMonth = new Date().getMonth();
    // console.log(months, currentMonth);
    // console.log(months.filter((m, i) => {
    //   let currentMonth = 10
    //   if (currentMonth)
    // }));
    const events = await prisma.event.findMany({
      where: { month: { in: months.filter((m, i) => i >= currentMonth) } },
      orderBy: { month: "asc" },
      take: 5,
    });

    return events;
  }

  static async GetEventsGroupByMonthsForLanding() {
    // This method fetches for the activities landing page. hence,
    // it only fetches data for the current year;
    const events = await prisma.event.findMany({
      where: { year: "2023" },
      orderBy: { month: "asc" },
    });
    return this.CreateEventGroups(events);
  }

  static async GetEventsByMonthAndYear(
    dto: EventsService.GetEventsByMonthAndYearDTO
  ) {
    const events = await prisma.event.findMany({
      where: {
        AND: [{ year: dto.year, month: (dto.month as Month) || undefined }],
      },
      orderBy: { month: "asc" },
    });
    return this.CreateEventGroups(events);
  }
}

export namespace EventsService {
  export type CreateNewEventDTO = {
    title: string;
    about: string;
    location: string;
    startTime: string;
    endTime: string;
    day: string;
    month: string;
    year: string;
  };

  export type CreateNewEventDAO = {};

  export type GetMostRecentEventsDAO = { events: Event[] };

  export type GetEventsGroupByMonthsDAO = Record<Month, Event[]>;

  export type GetEventsByMonthAndYearDTO = {
    month: string;
    year: string;
  };

  export type GetEventsByMonthAndYearDAO = Record<Month, Event[]>;
}
