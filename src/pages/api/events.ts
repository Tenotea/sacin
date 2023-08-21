import { EventsService } from "./../../server/services/events.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        await EventsService.CreateNewEvent(req, res);
        res.redirect("/admin/events?success=true");
      } catch (error) {
        res.redirect("/admin/events?success=false");
      }
      break;
    default:
      res.status(405);
  }
}
