import { EventsService } from "~/server/services/events.service";
import HttpService from "..";
import { RegisterParticipantDTO } from "~/server/services/event-registration.service";

class ParticipantsClient extends HttpService {
  constructor() {
    super({
      baseURL: "/api/participants",
    });
  }

  async RegisterForEvent(
    dto: RegisterParticipantDTO["participant"] & { id: string }
  ) {
    return this.SendRequest({
      method: "post",
      path: "/create",
      body: dto,
    });
  }
}

export const participantsClient = new ParticipantsClient();
