import { prisma } from "../db";

export class EventRegistrationService {
  static async RegisterParticipant(params: RegisterParticipantDTO) {
    const _eparticipant = await prisma.eventRegistration.findFirst({
      where: {
        AND: [
          { eventId: params.event.id },
          { emailAddress: params.participant.emailAddress },
        ],
      },
    });

    if (_eparticipant) {
      throw new Error(
        "It seems you have already registered for this event, please check your email for further instructions. Please contact support if you didn't get any mail."
      );
    }
    const participant = await prisma.eventRegistration.create({
      data: {
        eventId: params.event.id,
        ...params.participant,
      },
    });
    return participant;
  }
}
export type RegisterParticipantDTO = {
  event: { id: string };
  participant: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
  };
};
