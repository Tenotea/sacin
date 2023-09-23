import React from "react";
import { Month } from "@prisma/client";
import useAdminEventsTemplate from "./useAdminEventsTemplate";

export default function AdminEventsTemplate() {
  const { formData, handleChange, handleSubmit } = useAdminEventsTemplate();
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-gray-900/10">
          <h2 className="text-lg font-semibold leading-7 text-gray-900">
            Create Event
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Provide details of the event here. This information will be
            displayed publicly.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name of the Event
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="off"
                    required
                    value={formData.title}
                    onChange={(payload) =>
                      handleChange({
                        field: "title",
                        value: payload.currentTarget.value,
                      })
                    }
                    className="block flex-1 border-0 bg-transparent px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description of the event
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  value={formData.about}
                  onChange={(payload) =>
                    handleChange({
                      field: "about",
                      value: payload.currentTarget.value,
                    })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Provide any information relevant to the event here
              </p>
            </div>

            {/* <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Event of Banner (optional)
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="banner"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          {/* <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p> */}

          <div className="col-span-full">
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Location of the event
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="location"
                id="location"
                autoComplete="off"
                value={formData.location}
                onChange={(e) =>
                  handleChange({
                    field: "location",
                    value: e.currentTarget.value,
                  })
                }
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="start-time"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Start Time
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="startTime"
                  id="start-time"
                  value={formData.startTime}
                  onChange={(payload) =>
                    handleChange({
                      field: "startTime",
                      value: payload.currentTarget.value,
                    })
                  }
                  autoComplete="off"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="end-time"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                End Time
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="endTime"
                  id="end-time"
                  value={formData.endTime}
                  onChange={(payload) =>
                    handleChange({
                      field: "endTime",
                      value: payload.currentTarget.value,
                    })
                  }
                  autoComplete="off"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}

            {/* <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div> */}

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="day"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Day
              </label>
              <div className="mt-2">
                <select
                  name="day"
                  id="day"
                  required
                  value={formData.day}
                  onChange={(payload) =>
                    handleChange({
                      field: "day",
                      value: payload.currentTarget.value,
                    })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value={""} disabled>
                    Select Day
                  </option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((m) => (
                    <option className="" value={m} key={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="month"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Month
              </label>
              <div className="mt-2">
                <select
                  name="month"
                  id="month"
                  required
                  value={formData.month}
                  onChange={(payload) =>
                    handleChange({
                      field: "month",
                      value: payload.currentTarget.value,
                    })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value={""} disabled>
                    Select Month
                  </option>
                  {Object.keys(Month).map((m) => (
                    <option className="" value={m} key={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="year"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Year
              </label>

              <div className="mt-2">
                <select
                  name="year"
                  id="year"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.year}
                  onChange={(payload) =>
                    handleChange({
                      field: "year",
                      value: payload.currentTarget.value,
                    })
                  }
                >
                  <option value={""} disabled>
                    Click to select
                  </option>
                  <option value={"2023"}>2023</option>
                  <option value={"2024"}>2024</option>
                  <option value={"2025"}>2025</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Save to Drafts
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Event
        </button>
      </div>
    </form>
  );
}
