import { Icon } from "@iconify/react";
import { Admin } from "@prisma/client";
import Cookies from "cookies";
import { decode } from "jsonwebtoken";
import { NextPageContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IM_HeroLogo } from "~/client/assets/images";
import { dashboardNavigation } from "~/client/utils/index.util";
import { AdminService } from "~/server/services/admin.service";

export default function admin(props: {
  user: Admin;
  analytics: Awaited<
    ReturnType<typeof AdminService.GetAdminDashboardAnalytics>
  >;
}) {
  const router = useRouter();
  return (
    <main className="relative flex items-start">
      <aside className="sticky top-0 h-screen w-[250px] border-r pb-5">
        <div className="border-b px-5 py-3">
          <Link href={"/"}>
            <Image src={IM_HeroLogo} alt="sacin.org.ng" className="w-[150px]" />
          </Link>
        </div>

        <ul className="mt-6 grid gap-2 px-5">
          {dashboardNavigation.map((navItem) => (
            <li key={navItem.href} className="hover:bg-gray-50">
              <Link
                href={navItem.href}
                className={`block rounded-md px-4 py-2.5 text-sm ${
                  router.pathname.includes(navItem.href)
                    ? "bg-green-100 font-semibold text-green-700"
                    : "text-[#949494]"
                }`}
              >
                {navItem.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <section className="min-h-screen flex-grow bg-gray-50 px-7 py-6">
        <div>
          <h1 className="flex items-start gap-2 text-3xl font-medium">
            Hi there, {props.user.firstName}
            <Icon
              icon={"fluent-emoji:waving-hand"}
              width={40}
              className="-mt-2"
            />
          </h1>
          <p className="text-sm text-gray-400">
            You are your stats for the day
          </p>
        </div>

        <section className="mt-8 grid grid-cols-5 gap-6">
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
        {/* <section className="mt-8 bg-white py-5">
          <div className="grid grid-cols-3 gap-5">
            <div className="px-5 py-2">
              <Icon icon={""} />
              <div>
                <h6>{props.analytics.events}</h6>
                <p>Events</p>
              </div>
            </div>
          </div>
        </section> */}
      </section>
    </main>
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
