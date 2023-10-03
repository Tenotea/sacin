import { Icon } from "@iconify/react";
import { Admin, Event, EventRegistration } from "@prisma/client";
import Cookies from "cookies";
import { decode } from "jsonwebtoken";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import { IM_HeroBackground } from "~/client/assets/images";
import BaseTable from "~/client/components/base-table/BaseTable";
import DashboardLayout from "~/client/layouts/DashboardLayout";
import {
  getDateFromISOString,
  getFullMonthFromMonthCode,
} from "~/client/utils/functions";
import { createSlugFromString } from "~/client/utils/index.util";
import { AdminService } from "~/server/services/admin.service";
import { EventsService } from "~/server/services/events.service";

export default function index(props: {
  user: Admin;
  event: Event;
  participants: EventRegistration[];
}) {
  const router = useRouter();
  return (
    <DashboardLayout
      user={props.user}
      title={
        <div className="w-full">
          <button
            className="mb-5 flex items-center gap-2 rounded border bg-white px-2 py-2 text-xs"
            onClick={() => router.back()}
          >
            <Icon icon={"bi:arrow-left"} />
            Back
          </button>
          <div className="flex w-full items-start">
            {props.event.title}
            <div className="ml-auto flex max-w-max gap-6 rounded border bg-white px-4 py-2 text-sm">
              <a
                href={`/activities/${props.event.id}/${createSlugFromString(
                  props.event.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="flex items-center gap-1 font-medium text-blue-500">
                  <Icon icon={"fluent-mdl2:open-in-new-tab"} />
                  View
                </button>
              </a>
              <button className="flex items-center gap-1 text-orange-500">
                <Icon icon={"tabler:edit"} />
                Edit
              </button>
              <button className="flex items-center gap-1 text-red-600">
                <Icon icon={"fluent:delete-12-filled"} /> Delete
              </button>
            </div>
          </div>
        </div>
      }
      subtitle="Event Information"
    >
      <section className="grid grid-cols-3 gap-5">
        <div className="gap-5 rounded-lg border bg-white py-5">
          <div className="px-7 py-2">
            <h6 className="mb-4 mt-10 text-lg font-medium text-green-700">
              Event
            </h6>
            <div className="flex items-start gap-2 text-3xl">
              <Icon
                icon={"solar:calendar-bold"}
                className="mt-1 text-gray-400"
                width={25}
              />
              <p>
                {props.event.day} {getFullMonthFromMonthCode(props.event.month)}
                , {props.event.year}
              </p>
            </div>

            <ul className="mt-5 grid gap-2">
              <li className="flex items-start  gap-2 text-sm">
                <Icon
                  icon={"fluent:location-12-filled"}
                  width={18}
                  className="mt-0.5 flex-shrink-0 text-gray-400"
                />
                {props.event.location}
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Icon
                  icon={"solar:clock-circle-bold"}
                  width={18}
                  className="flex-shrink-0 text-gray-400"
                />
                {props.event.startsAt} - {props.event.endsAt}
              </li>
            </ul>
          </div>
        </div>
        <div className="gap-5 rounded-lg border bg-white py-5">
          <div className="px-7 py-2">
            <h6 className="mb-4 mt-10 text-lg font-medium text-green-700">
              Participation
            </h6>
            <div className="flex items-start gap-2 text-4xl">
              <Icon
                icon={"solar:users-group-two-rounded-outline"}
                className="mt-0.5 text-gray-400"
                width={30}
              />
              <p>{props.participants.length.toLocaleString()}</p>
            </div>

            <ul className="mt-5 grid gap-2">
              <li className="flex items-center gap-2 text-sm">
                <Icon
                  icon={"majesticons:info-circle"}
                  width={18}
                  className="text-gray-400"
                />
                0 Accepted Invitations
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Icon
                  icon={"majesticons:info-circle"}
                  width={18}
                  className="text-gray-400"
                />
                2 Awaiting Response
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Icon
                  icon={"majesticons:info-circle"}
                  width={18}
                  className="text-gray-400"
                />
                0 Declined Invitations
              </li>
            </ul>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg">
          <img
            src={IM_HeroBackground.default.src}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100">
            <label
              htmlFor="eventBanner"
              className="cursor-pointer rounded border-2 border-white bg-transparent px-5 py-2 text-sm text-white"
            >
              Change Image
            </label>
            <input type="file" hidden id="eventBanner" accept="image/*" />
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="mb-2 text-lg font-semibold">Participants</h3>
        <div className="w-full overflow-auto border-x">
          <BaseTable
            headers={[
              { id: "id", name: "S/N" },
              { id: "name", name: "Name" },
              { id: "emailAddress", name: "Email Address" },
              { id: "phoneNumber", name: "Phone Number" },
              { id: "createdAt", name: "Created At" },
            ]}
            data={props.participants.map((event, i) => ({
              id: `#${i + 1}`,
              discreetId: event.id,
              name: `${event.firstName} ${event.lastName}`,
              emailAddress: event.emailAddress,
              phoneNumber: event.phoneNumber,
              createdAt: (
                <div>
                  {
                    getDateFromISOString(event.createdAt as unknown as string)
                      .date
                  }{" "}
                  at{" "}
                  <span className="text-xs">
                    {
                      getDateFromISOString(event.createdAt as unknown as string)
                        .time
                    }
                  </span>
                </div>
              ),
            }))}
          />
          {props.participants.length === 0 && (
            <div className="flex min-h-[300px] items-center justify-center border-b bg-white">
              <div className="text-gray-400">
                <Icon
                  icon={"pepicons-pencil:people-circle-off"}
                  width={40}
                  className="mx-auto mb-2"
                />
                There are no participants for this event
              </div>
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}

export async function getServerSideProps({ req, res, query }: NextPageContext) {
  const cookies = new Cookies(req!, res!);
  const authorizationToken = cookies.get("authorizationToken");

  if (!authorizationToken) {
    res!.setHeader("location", "/_console/admin/");
    res!.statusCode = 302;
    res!.end();
    return;
  }

  const user = decode(authorizationToken, { json: true });
  const event = await EventsService.GetEventById({
    id: query.eventid?.toString() || "",
  });
  const participants = await AdminService.GetEventAnalytics({
    eventId: query.eventid?.toString() || "",
  });
  return { props: { user, event, participants } };
}
