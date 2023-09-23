import { NextApiRequest, NextApiResponse } from "next";
import { AdminService } from "~/server/services/admin.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("Init");
    try {
      const admin = await AdminService.CreateNewAdminAccount(req.body);
      res.json({ message: "Successfully created new admin", data: admin });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
