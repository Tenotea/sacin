import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { eventsClient } from "~/client/http/sacin-api/events.client";
import useFormData from "~/client/utils/hooks/useFormData";

export function useAdminArticlesTemplate() {
  const [isActionCreatingEvent, setIsActionCreatingEvent] = useState(false);
  const form = useFormData({
    title: "",
    content: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsActionCreatingEvent(true);
    // const { data, error } = await eventsClient.CreateNewEvent;
    // setIsActionCreatingEvent(false);
    // if (error) {
    //   toast.error(error.message);
    // }

    // if (data) {
    //   toast(data.message);
    // }
  }
  return { ...form, handleSubmit, isActionCreatingEvent };
}
