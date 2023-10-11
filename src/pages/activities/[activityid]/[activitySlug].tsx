import { Icon } from "@iconify/react";
import { Event } from "@prisma/client";
import { NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { IM_HeroBackground } from "~/client/assets/images";
import { AboutUsChunk } from "~/client/chunks/AboutUsChunk";
import { HomeHeroChunk } from "~/client/chunks/HomeHeroChunk";
import { PageFooterChunk } from "~/client/chunks/PageFooterChunk";
import Breadcrumb from "~/client/components/breadcrumb/Breadcrumb";
import { TextInput } from "~/client/components/text-input/TextInput";
import { participantsClient } from "~/client/http/sacin-api/participants.client";
import { getFullMonthFromMonthCode } from "~/client/utils/functions";
import { useForm } from "~/client/utils/hooks/useForm";
import { createSlugFromString } from "~/client/utils/index.util";
import { EventsService } from "~/server/services/events.service";

export type ActivityPageProps = {
  event: Event;
};

export default function ActivityPage(props: ActivityPageProps) {
  const homeHeroChunk = HomeHeroChunk.use();
  const [isActionRegister, setIsActionRegister] = useState(false);
  const router = useRouter();
  const {
    fieldNames,
    formData,
    handleChange,
    handleSubmit,
    validationError,
    validationSchema,
  } = useForm({
    initialFormData: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
    },
    validationSchema: z.object({
      firstName: z.string().nonempty("This field is required"),
      lastName: z.string().nonempty("This field is required"),
      emailAddress: z.string().nonempty("This field is required"),
      phoneNumber: z.string().nonempty("This field is required"),
    }),
    async onSubmit(formData) {
      const { data, error } = await participantsClient.RegisterForEvent({
        ...formData,
        id: router.query.activityid!.toString(),
      });

      if (error) {
        toast.error(error.message);
      }

      if (data) {
        toast(data.message);
        setIsActionRegister(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>
          {props.event.title} | SACIN - Society for Automation Control and
          Instrumentation of Nigeria
        </title>
      </Head>
      <HomeHeroChunk.UI
        {...homeHeroChunk}
        title={props.event.title}
        subtitle={
          <span className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-2">
              <Icon icon={"fluent:location-28-filled"} width={16} />
              {props.event.location}
            </span>
            <span className="flex items-center gap-2">
              <Icon icon={"mingcute:time-fill"} width={16} />
              <span>
                {props.event.startsAt} - {props.event.endsAt}
              </span>
            </span>
            <span className="flex items-center gap-2">
              <Icon icon={"solar:calendar-bold"} width={16} />
              <span>
                {props.event.day} {getFullMonthFromMonthCode(props.event.month)}{" "}
                {props.event.year}
              </span>
            </span>
          </span>
        }
      />

      <section className="mx-auto w-11/12 max-w-[1400px] py-10">
        <Breadcrumb
          paths={[
            { title: "Home", path: "/" },
            {
              title: "Activities",
              path: `/activities?year=${props.event.year}`,
            },
            {
              title: props.event.title,
              path: `/activities/${props.event.id}/${createSlugFromString(
                props.event.title
              )}`,
            },
          ]}
        />
      </section>
      <section className="mx-auto w-11/12 max-w-[1400px]">
        <img
          src={IM_HeroBackground.default.src}
          alt=""
          className="h-[400px] w-full rounded object-cover"
        />
      </section>

      <section className="mx-auto flex w-11/12 max-w-[1200px] flex-wrap items-start justify-between gap-10 py-10">
        <article className="w-[60%]">{props.event.description}</article>
        <div className="">
          <h4 className="text-2xl font-bold">Ready to Attend?</h4>
          <p className="mb-6 mt-1 max-w-xs text-sm text-gray-500">
            {props.event.location.toLowerCase() === "online"
              ? `
              This event will take place online and will not require you to be
              physically present. By registering for the event, more information
              about the program will be sent to you via email.
            `
              : `
            This event will take place at a physical location and will require you to be
             present at the venue. By registering for the event, more information
              about the program will be sent to you via email.
            `}
          </p>

          <button
            className="rounded bg-amber-600 px-5 py-3 text-sm font-medium text-white"
            onClick={() => setIsActionRegister(true)}
          >
            Register for this event
          </button>
        </div>
      </section>

      <AboutUsChunk.UI />
      <PageFooterChunk.UI />
      {isActionRegister && (
        <section className="fixed inset-0 left-0 z-10 h-screen w-full bg-black bg-opacity-20">
          <form
            onSubmit={handleSubmit}
            className="relative mx-auto mt-20 max-w-screen-sm rounded-lg bg-white p-10"
          >
            <header className="mb-6">
              <h4 className="text-2xl font-semibold">Secure your spot!</h4>
              <p className="text-sm text-gray-400">
                Kindly fill the form with correct details.
              </p>
            </header>

            <div className="grid grid-cols-2 gap-5">
              <TextInput
                label="First Name"
                name={fieldNames.firstName}
                onChange={handleChange}
                value={formData.firstName}
                validation={validationSchema?.firstName}
                validationTrigger={validationError}
              />
              <TextInput
                label="Last Name"
                name={fieldNames.lastName}
                onChange={handleChange}
                value={formData.lastName}
                validation={validationSchema?.lastName}
                validationTrigger={validationError}
              />
            </div>
            <div className="mt-5 grid gap-5">
              <TextInput
                label="Email Address"
                name={fieldNames.emailAddress}
                onChange={handleChange}
                value={formData.emailAddress}
                validation={validationSchema?.emailAddress}
                validationTrigger={validationError}
              />
              <TextInput
                label="Phone Number"
                name={fieldNames.phoneNumber}
                onChange={handleChange}
                value={formData.phoneNumber}
                validation={validationSchema?.phoneNumber}
                validationTrigger={validationError}
              />
            </div>
            <p className="mt-5 text-sm text-gray-600">
              * By Registering for this event, you consent to receiving
              promotional materials from SACIN and updates regarding future
              events and activities.
            </p>
            <button className="mt-8 w-full rounded bg-amber-600 px-5 py-3 text-sm font-medium text-white">
              Register for this event
            </button>
            <button
              type="button"
              className="mx-auto mt-5 block text-sm text-gray-400 underline"
              onClick={() => setIsActionRegister(false)}
            >
              Cancel Registration
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export const getServerSideProps = async function ({ query }: NextPageContext) {
  try {
    const event = await EventsService.GetClientEventById({
      id: query.activityid?.toString() || "",
    });

    return { props: { event } };
  } catch (error) {
    return { props: { event: {} } };
  }
};
