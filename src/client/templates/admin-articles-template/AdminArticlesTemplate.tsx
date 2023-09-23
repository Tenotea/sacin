import React from "react";
import { useAdminArticlesTemplate } from "./useAdminArticlesTemplate";
import DynamicTextEditor from "~/client/components/dynamic-text-editor/DynamicTextEditor";

export default function AdminArticlesTemplate() {
  const { formData, handleChange, handleSubmit } = useAdminArticlesTemplate();
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12 border-b border-gray-900/10 pb-12">
        <div className="border-gray-900/10">
          <h2 className="text-lg font-semibold leading-7 text-gray-900">
            Create Article
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Provide content of the article here. This information will be
            publicly displayed.
          </p>

          <div className="col-span-full mt-10">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title of the article
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="off"
                value={formData.title}
                onChange={(e) =>
                  handleChange({ field: "title", value: e.currentTarget.value })
                }
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <DynamicTextEditor
            name="content"
            onChange={handleChange}
            value={formData.content as any}
          />
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
