import { EventsService } from "~/server/services/events.service";
import HttpService from "..";

class AdminClient extends HttpService {
  constructor() {
    super({
      baseURL: "/api/users/admin",
    });
  }

  async AuthenticateAdminCredentials(dto: {
    emailAddress: string;
    password: string;
  }) {
    return this.SendRequest({
      method: "post",
      path: "/sign-in",
      body: dto,
    });
  }
}

export const adminClient = new AdminClient();
