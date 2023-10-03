import { EventsService } from "~/server/services/events.service";
import HttpService from "..";

class EventsClient extends HttpService {
  constructor() {
    super({
      baseURL: "/api/events",
    });
  }

  async CreateNewEvent(dto: EventsService.CreateNewEventDTO) {
    return this.SendRequest({
      method: "post",
      path: "/",
      body: dto,
    });
  }

  async RegisterForEvent() {
    return this.SendRequest({
      method: "post",
      path: "/",
    });
  }
}

export const eventsClient = new EventsClient();
