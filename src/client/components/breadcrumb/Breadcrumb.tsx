import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

type BreadcrumbProps = {
  paths: { path: string; title: string }[];
};

export default function Breadcrumb(props: BreadcrumbProps) {
  return (
    <ul className="flex items-center gap-1">
      {props.paths.map((path, i) => (
        <li key={path.path} className="flex items-center gap-1">
          <Link
            href={path.path}
            className={
              i >= props.paths.length - 1 ? "font-bold text-[#018347]" : ""
            }
          >
            {path.title}
          </Link>
          {i < props.paths.length - 1 && <Icon icon={"uil:angle-right"} />}
        </li>
      ))}
    </ul>
  );
}
