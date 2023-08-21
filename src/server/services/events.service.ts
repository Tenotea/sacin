import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "../db";
import { Event } from "@prisma/client";

export class EventsService {
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

  static async GetMostRecentEvents() {
    const events = await prisma.event.findMany({
      orderBy: { month: "asc" },
      take: 5,
    });

    return events;
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
}
