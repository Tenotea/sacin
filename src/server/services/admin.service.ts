import { hashSync } from "bcryptjs";
import { prisma } from "../db";

export class AdminService {
  static async GetAdminByEmailAddress(dto: { emailAddress: string }) {
    try {
      const admin = await prisma.admin.findFirstOrThrow({
        where: { emailAddress: dto.emailAddress },
      });
      return admin;
    } catch (error) {
      throw new Error(
        "An account associated with this email does not exist. Please contact your administrator"
      );
    }
  }

  static async CreateNewAdminAccount(dto: {
    emailAddress: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const admin = await prisma.admin.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        emailAddress: dto.emailAddress,
        password: hashSync(dto.password),
      },
    });
    return admin;
  }

  static async GetAdminDashboardAnalytics() {
    const adminAccounts = await prisma.admin.count();
    const events = await prisma.event.count();
    const contents = await prisma.content.count();

    return { teamMembers: adminAccounts, events, contents };
  }
}
