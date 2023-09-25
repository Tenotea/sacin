import React, { ReactNode } from "react";

export type BaseTableProps = {
  headers: { id: string; name: ReactNode }[];
  data: Array<Record<string, ReactNode>>;
};

export default function BaseTable(props: BaseTableProps) {
  return (
    <table className="w-full min-w-[1100px] rounded-xl">
      <thead>
        <tr className="border-app-gray-accent-5 rounded-t-xl border-y bg-[#FBFBFB] px-2 text-left">
          {props.headers.map((header) => (
            <th
              key={header.id}
              className="border-r py-2 pl-5 text-xs font-normal uppercase first:w-[65px] last:border-r-0 last:pr-5 "
            >
              {header.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row) => (
          <tr
            className="border-b bg-white font-medium last:rounded-b-lg last:border-b-0"
            key={row.id?.toString()}
          >
            {props.headers.map((header) => (
              <td
                key={header.id}
                className="py-3 pl-5 text-xs font-normal text-[#4d4d4d] first:border-r last:border-r-0 last:pr-5"
              >
                {row[header.id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
