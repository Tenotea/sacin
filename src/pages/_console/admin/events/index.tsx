import { Icon } from "@iconify/react";
import { Admin, Event, Month } from "@prisma/client";
import Cookies from "cookies";
import { decode } from "jsonwebtoken";
import { NextPageContext } from "next";
import React, { useEffect, useState } from "react";
import BaseTable from "~/client/components/base-table/BaseTable";
import SelectBox from "~/client/components/select-box/SelectBox";
import DashboardLayout from "~/client/layouts/DashboardLayout";
import {
  getDateFromISOString,
  getFullMonthFromMonthCode,
} from "~/client/utils/functions";
import useFormData from "~/client/utils/hooks/useFormData";
import { getPlatformEventYears } from "~/client/utils/index.util";
import { AdminService } from "~/server/services/admin.service";
import { EventsService } from "~/server/services/events.service";

export default function index(props: {
  user: Admin;
  events: Event[];
  analytics: Awaited<
    ReturnType<typeof AdminService.GetAdminDashboardAnalytics>
  >;
}) {
  const years = getPlatformEventYears();
  const [events, setEvents] = useState(props.events.slice());
  const searchFormData = useFormData({
    query: "",
    year: "",
    month: "",
  });

  function handleQueryChange() {
    const { query, month, year } = searchFormData.formData;
    let _events = props.events
      .slice()
      .filter((ev) =>
        ev.title.toLowerCase().includes(query.toLocaleLowerCase())
      );

    if (month || year) {
      if (month) {
        _events = _events.filter((ev) => ev.month === month);
      }

      if (year) {
        _events = _events.filter((ev) => ev.year === year);
      }
    }
    setEvents(_events);
  }

  useEffect(() => {
    handleQueryChange();
  }, [searchFormData.formData]);

  return (
    <DashboardLayout
      title="Events manager"
      subtitle="Everything events. Create, edit, delete, invite"
      user={props.user}
    >
      <section className="mb-6 mt-4 grid grid-cols-5 gap-6">
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
              Participation
            </h6>
            <div className="flex items-start gap-2 text-4xl">
              <Icon
                icon={"solar:users-group-two-rounded-outline"}
                className="mt-0.5 text-gray-400"
                width={30}
              />
              <p>138</p>
            </div>

            <ul className="mt-5 grid gap-2">
              <li className="flex items-center gap-2 text-sm">
                <Icon
                  icon={"majesticons:info-circle"}
                  width={18}
                  className="text-gray-400"
                />
                104 Accepted Invitations
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Icon
                  icon={"majesticons:info-circle"}
                  width={18}
                  className="text-gray-400"
                />
                14 Awaiting Response
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Icon
                  icon={"majesticons:info-circle"}
                  width={18}
                  className="text-gray-400"
                />
                20 Declined Invitations
              </li>
            </ul>

            <button className="mt-6 rounded-md border border-green-600 px-4 py-2 text-sm font-medium text-green-600">
              Start a new draft
            </button>
          </div>
        </div>
      </section>
      <main>
        <section className="mb-2.5 flex items-end justify-between gap-4">
          <div className="relative w-full max-w-[300px]">
            <Icon
              icon={"iconamoon:search"}
              width={14}
              className="absolute bottom-0 left-3 top-0 my-auto text-[#868686]"
            />
            <input
              type="search"
              className="block w-full rounded border border-gray-200 py-2.5 pl-10 pr-4 text-xs outline-none placeholder:text-gray-300 focus:border-gray-200 focus:ring-0"
              placeholder="Search event titles"
              onChange={(e) =>
                searchFormData.handleChange({
                  field: "query",
                  value: e.currentTarget.value,
                })
              }
            />
          </div>

          <div className="w-full max-w-[250px]">
            <div className="flex w-full items-center gap-2">
              <div className="w-[40%]">
                <SelectBox
                  name="year"
                  placeholder="Year"
                  onChange={searchFormData.handleChange}
                  options={years}
                  value={searchFormData.formData.year}
                />
              </div>
              <div className="w-[60%]">
                <SelectBox
                  placeholder="All"
                  name={searchFormData.fieldNames.month}
                  onChange={searchFormData.handleChange}
                  options={[
                    { id: "", name: "All" },
                    ...Object.values(Month).map((month) => ({
                      id: month,
                      name: getFullMonthFromMonthCode(month),
                    })),
                  ]}
                  value={getFullMonthFromMonthCode(
                    searchFormData.formData.month as Month
                  )}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="border-x">
          <div className="w-full overflow-auto">
            <BaseTable
              headers={[
                { id: "id", name: "ID" },
                { id: "title", name: "Title" },
                { id: "date", name: "Date" },
                { id: "time", name: "Time" },
                { id: "createdAt", name: "Created At" },
                { id: "action", name: "" },
              ]}
              data={events.map((event, i) => ({
                id: `#${i + 1}`,
                title: event.title,
                date: `${event.day} ${getFullMonthFromMonthCode(event.month)} ${
                  event.year
                }`,
                time: `${event.startsAt} - ${event.endsAt}`,
                createdAt: (
                  <div>
                    {
                      getDateFromISOString(event.createdAt as unknown as string)
                        .date
                    }{" "}
                    at{" "}
                    <span className="text-xs">
                      {
                        getDateFromISOString(
                          event.createdAt as unknown as string
                        ).time
                      }
                    </span>
                  </div>
                ),
              }))}
            />
          </div>
        </section>
      </main>
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
  const events = await EventsService.GetAllEvents();
  const analytics = await AdminService.GetAdminDashboardAnalytics();
  return { props: { user, events, analytics } };
}
