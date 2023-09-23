import { Event, Month } from "@prisma/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AboutUsChunk } from "~/client/chunks/AboutUsChunk";
import { HomeHeroChunk } from "~/client/chunks/HomeHeroChunk";
import { PageFooterChunk } from "~/client/chunks/PageFooterChunk";
import Breadcrumb from "~/client/components/breadcrumb/Breadcrumb";
import EventsList from "~/client/components/events-list/EventsList";
import SelectBox from "~/client/components/select-box/SelectBox";
import { getFullMonthFromMonthCode } from "~/client/utils/functions";
import useFormData from "~/client/utils/hooks/useFormData";
import { EventsService } from "~/server/services/events.service";
import { NextPageContext } from "next";

type ActivitiesPageProps = {
  events?: EventsService.GetEventsGroupByMonthsDAO;
};

export default function ActivitiesPage(props: ActivitiesPageProps) {
  const startYear = 2023;
  const router = useRouter();
  const homeHeroChunk = HomeHeroChunk.use();
  const searchParams = useSearchParams();
  const [years, setYears] = useState<{ id: string; name: string }[]>([]);
  const filterFormData = useFormData({
    year: "",
    month: "",
  });

  function generateYearFilters() {
    const _y = [];
    const currentYear = new Date().getFullYear();

    for (let i = startYear; i <= currentYear + 2; i++) {
      _y.push({ id: i.toString(), name: i.toString() });
    }
    setYears(_y);
    const paramYear = searchParams.get("year");
    if (
      paramYear &&
      parseInt(paramYear) <= currentYear + 2 &&
      parseInt(paramYear) >= startYear
    ) {
      filterFormData.handleChange({
        field: filterFormData.fieldNames.year || "year",
        value: paramYear,
      });
    } else {
      filterFormData.handleChange({
        field: filterFormData.fieldNames.year || "year",
        value: currentYear.toString(),
      });
    }
  }

  function handleDefaultMonthValue() {
    const monthParam = searchParams.get("month");
    if (monthParam) {
      filterFormData.handleChange({
        field: filterFormData.fieldNames.month || "month",
        value: monthParam,
      });
    }
  }

  useEffect(() => {
    generateYearFilters();
    handleDefaultMonthValue();
  }, [router.asPath]);

  useEffect(() => {
    const searchParam = new URLSearchParams();
    if (filterFormData.formData.year) {
      searchParam.append(
        filterFormData.fieldNames.year,
        filterFormData.formData.year
      );
    }

    if (filterFormData.formData.month) {
      searchParam.append(
        filterFormData.fieldNames.month,
        filterFormData.formData.month
      );
    }
    if (filterFormData.formData.year || filterFormData.formData.month) {
      router.replace(router.pathname + "?" + searchParam.toString());
    }
  }, [filterFormData.formData]);

  return (
    <>
      <Head>
        <title>
          Activities | SACIN - Society for Automation Control and
          Instrumentation of Nigeria
        </title>
        <meta
          name="description"
          content="promoting the science and technology of control systems in all its ramifications"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeHeroChunk.UI {...homeHeroChunk} />
      <section className="mx-auto mb-14 mt-8 flex w-11/12 max-w-[1400px] flex-col flex-wrap justify-between gap-6 sm:mt-14 sm:flex-row sm:items-center">
        <Breadcrumb
          paths={[
            { path: "/", title: "Home" },
            { path: "/activities", title: "Activities" },
          ]}
        />

        <div className="flex-grow sm:max-w-[250px]">
          <p className="text-xs">Filter By</p>
          <div className="flex w-full items-center gap-2">
            <div className="w-[40%]">
              <SelectBox
                name="year"
                placeholder="Year"
                onChange={filterFormData.handleChange}
                options={years}
                value={filterFormData.formData.year}
              />
            </div>
            <div className="w-[60%]">
              <SelectBox
                placeholder="All"
                name={filterFormData.fieldNames.month}
                onChange={filterFormData.handleChange}
                options={[
                  { id: "", name: "All" },
                  ...Object.values(Month).map((month) => ({
                    id: month,
                    name: getFullMonthFromMonthCode(month),
                  })),
                ]}
                value={getFullMonthFromMonthCode(
                  filterFormData.formData.month as Month
                )}
              />
            </div>
          </div>
        </div>
      </section>
      {props.events && (
        <div className="mx-auto mb-24 grid w-11/12 max-w-[1400px] gap-14 md:gap-20">
          {Object.keys(props.events).map((month) => (
            <section key={month}>
              <h2 className="mb-4 font-clash text-xl font-semibold md:mb-8 md:text-3xl">
                For the month of {getFullMonthFromMonthCode(month as Month)}
              </h2>

              <EventsList events={props.events?.[month as Month] || []} />
            </section>
          ))}
        </div>
      )}
      <AboutUsChunk.UI />
      <PageFooterChunk.UI />
    </>
  );
}

export const getServerSideProps = async function ({ query }: NextPageContext) {
  try {
    let events = {} as Record<Month, Event[]>;
    events = await EventsService.GetEventsByMonthAndYear({
      month: query.month?.toString() || "",
      year: query.year?.toString() || "",
    });

    return { props: { events } };
  } catch (error) {
    return { props: { events: {} } };
  }
};
