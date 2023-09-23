import { Icon } from "@iconify/react";
import Cookies from "cookies";
import { NextPageContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { IM_HeroLogo } from "~/client/assets/images";
import Spinner from "~/client/components/spinner/Spinner";
import { TextInput } from "~/client/components/text-input/TextInput";
import { adminClient } from "~/client/http/sacin-api/admin.client";
import { useForm } from "~/client/utils/hooks/useForm";

export default function AdminPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    fieldNames,
    formData,
    handleChange,
    handleSubmit,
    validationSchema,
    validationError,
  } = useForm({
    initialFormData: {
      emailAddress: "",
      password: "",
    },
    validationSchema: z.object({
      emailAddress: z
        .string()
        .nonempty("Email is required")
        .email("Please enter a valid email address"),
      password: z.string().nonempty("Password is required"),
    }),
    async onSubmit(formData) {
      setIsSubmitting(true);
      const { data, error } = await adminClient.AuthenticateAdminCredentials(
        formData
      );
      setIsSubmitting(false);

      if (error) {
        toast.error(error.message);
      }

      if (data) {
        toast(data.message);
        router.push("/_console/admin/dashboard");
      }
    },
  });

  return (
    <main className="h-screen bg-gray-100 pt-20">
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid max-w-screen-sm gap-5 rounded-xl bg-white p-10"
      >
        <div className="">
          <Link href={"/"}>
            <Image
              src={IM_HeroLogo}
              alt="sacin.org.ng"
              className="w-[65%] md:w-[300px]"
            />
          </Link>

          <h2 className="mb-3 mt-10 text-center font-clash text-3xl font-semibold text-[#4d4d4d]">
            Admin Login
          </h2>
        </div>

        <TextInput
          label="Email Address"
          name={fieldNames.emailAddress}
          onChange={handleChange}
          value={formData.emailAddress}
          validation={validationSchema?.emailAddress}
          validationTrigger={validationError}
        />
        <TextInput
          label="Password"
          type="password"
          name={fieldNames.password}
          onChange={handleChange}
          value={formData.password}
          validation={validationSchema?.password}
          validationTrigger={validationError}
        />
        <button className="flex w-full items-center justify-center rounded-lg bg-green-700 py-4 text-sm text-white">
          {isSubmitting ? <Spinner /> : "Continue to Dashboard"}
        </button>
      </form>
      <Link
        href={"/"}
        className="mx-auto mt-5 flex max-w-max items-center gap-2 text-center text-sm"
      >
        <Icon icon={"bi:arrow-left"} />
        Back to Home
      </Link>
    </main>
  );
}

export function getServerSideProps({ req, res }: NextPageContext) {
  const cookies = new Cookies(req!, res!);
  const authorizationToken = cookies.get("authorizationToken");

  if (authorizationToken) {
    res!.setHeader("location", "/_console/admin/dashboard");
    res!.statusCode = 302;
    res!.end();
    return;
  }

  return { props: {} };
}
