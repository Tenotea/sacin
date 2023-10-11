import { Icon } from "@iconify/react";
import React from "react";

export type EventFeedbackProps = {
  message?: string;
};

export default function EventFeedback(props: EventFeedbackProps) {
  return (
    <section className="mx-auto flex min-h-[400px] w-11/12 items-center justify-center rounded bg-[#f1f1f1]">
      <div className="text-center">
        <Icon icon={"fluent:info-12-regular"} className="mx-auto text-4xl" />
        <p className="mt-2 text-gray-600">
          {props.message || "There are no events for this period"}
        </p>
      </div>
    </section>
  );
}
