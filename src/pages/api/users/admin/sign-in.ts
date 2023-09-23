import { compareSync } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
// import { cookies } from "next/headers";
import { AdminService } from "~/server/services/admin.service";
import { sign } from "jsonwebtoken";
import Cookies from "cookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        // TODO: Add Zod Validator
        const admin = await AdminService.GetAdminByEmailAddress({
          emailAddress: req.body.emailAddress,
        });

        const isPasswordCorrect = compareSync(
          req.body.password,
          admin.password
        );

        if (!isPasswordCorrect) {
          throw new Error(
            "Incorrect email or password provided. Please check and try again."
          );
        }
        const cookies = new Cookies(req, res);
        cookies.set(
          "authorizationToken",
          sign(
            {
              id: admin.id,
              firstName: admin.firstName,
              lastName: admin.lastName,
              emailAddress: admin.emailAddress,
              createdAt: admin.createdAt,
            },
            process.env.JSWR_SCRET || "",
            {
              expiresIn: "1h",
            }
          ),
          {
            httpOnly: true,
            sameSite: "lax",
          }
        );

        res.json({
          message:
            "Your credentials have been authenticated! Proceeding to your dashboard",
        });
      } catch (error: any) {
        res.status(400).json({
          message: error.message,
        });
      }
      break;
    default:
      res.status(405);
  }
}
