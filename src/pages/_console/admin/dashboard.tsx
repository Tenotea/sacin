import { Icon } from "@iconify/react";
import { Admin } from "@prisma/client";
import Cookies from "cookies";
import { decode } from "jsonwebtoken";
import { NextPageContext } from "next";
import React from "react";
import DashboardLayout from "~/client/layouts/DashboardLayout";
import { AdminService } from "~/server/services/admin.service";

export default function admin(props: {
  user: Admin;
  analytics: Awaited<
    ReturnType<typeof AdminService.GetAdminDashboardAnalytics>
  >;
}) {
  return (
    <DashboardLayout
      title={
        <>
          Hi there, {props.user.firstName}
          <Icon
            icon={"fluent-emoji:waving-hand"}
            width={40}
            className="-mt-2"
          />
        </>
      }
      subtitle={"Here are your stats for the day"}
    >
      <section className=" grid grid-cols-5 gap-6">
        <div className="col-span-2 rounded-lg border bg-white py-5">
          <div className="px-7 py-2">
            <h6 className="mb-4 mt-10 text-lg font-medium text-green-700">
              Events
            </h6>
            <div className="flex items-start gap-2 text-4xl">
              <Icon
                icon={"solar:calendar-add-broken"}
                className="mt-0.5 text-gray-400"
                width={30}
              />
              <p>{props.analytics.events}</p>
            </div>

            <ul className="mt-5 grid gap-2">
              <li className="flex items-center gap-2 text-sm">
                <Icon
                  icon={"majesticons:info-circle"}
                  width={18}
                  className="text-gray-400"
                />
                13 Upcoming Events
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Icon
                  icon={"majesticons:info-circle"}
                  width={18}
                  className="text-gray-400"
                />
                24 Completed Events
              </li>
            </ul>

            <button className="mt-6 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white">
              Create a new event
            </button>
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-2 gap-5 rounded-lg border bg-white py-5">
          <div className="px-7 py-2">
            <h6 className="mb-4 mt-10 text-lg font-medium text-green-700">
              Contents
            </h6>
            <div className="flex items-start gap-2 text-4xl">
              <Icon
                icon={"solar:folder-open-broken"}
                className="mt-0.5 text-gray-400"
                width={30}
              />
              <p>{props.analytics.contents}</p>
            </div>

            <ul className="mt-5 grid gap-2">
              <li className="flex items-center gap-2 text-sm">
                <Icon
                  icon={"majesticons:info-circle"}
                  width={18}
                  className="text-gray-400"
                />
                0 Draft Contents
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Icon
                  icon={"majesticons:info-circle"}
                  width={18}
                  className="text-gray-400"
                />
                0 Published Contents
              </li>
            </ul>

            <button className="mt-6 rounded-md border border-green-600 px-4 py-2 text-sm font-medium text-green-600">
              Start a new draft
            </button>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

export async function getServerSideProps({ req, res }: NextPageContext) {
  const cookies = new Cookies(req!, res!);
  const authorizationToken = cookies.get("authorizationToken");

  if (!authorizationToken) {
    res!.setHeader("location", "/_console/admin/");
    res!.statusCode = 302;
    res!.end();
    return;
  }
  const user = decode(authorizationToken, { json: true });
  const analytics = await AdminService.GetAdminDashboardAnalytics();
  return { props: { user, analytics } };
}
