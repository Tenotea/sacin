import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";
import { string } from "zod";

type SelectBoxProps = {
  value: string;
  name: string;
  onChange: (payload: { field: string; value: string }) => void;
  options: Array<{ id: string; name: string }>;
  placeholder?: string;
};

export default function SelectBox(props: SelectBoxProps) {
  function handleChange(value: string) {
    props.onChange({
      field: props.name,
      value: value,
    });
  }

  return (
    <div className="relative w-full">
      <Listbox value={props.value} onChange={handleChange}>
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-100 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">
            {props.value || props.placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={
              "absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            }
          >
            {props.options.map((option) => (
              <Listbox.Option
                key={option.id}
                value={option.id}
                className={
                  "relative cursor-pointer select-none rounded-md px-4 py-2 hover:bg-gray-100 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
                }
              >
                {option.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}
