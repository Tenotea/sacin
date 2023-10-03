import { NextApiRequest, NextApiResponse } from "next";
import { EventRegistrationService } from "~/server/services/event-registration.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const participant = await EventRegistrationService.RegisterParticipant({
          event: { id: req.body.id },
          participant: {
            emailAddress: req.body.emailAddress,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
          },
        });
        res.json({
          message:
            "You have successfully been registered for this event, further instructions will be communicate to you via the email address you provided.",
          data: participant,
        });
      } catch (error: any) {
        res.json({ message: error.message });
      }
      break;
    default:
      res.status(405);
  }
}
