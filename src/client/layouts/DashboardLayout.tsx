import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { dashboardNavigation } from "../utils/index.util";
import { IM_HeroLogo } from "../assets/images";
import { Admin } from "@prisma/client";

type DashboardLayoutProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  user?: Admin;
};

export default function DashboardLayout(props: DashboardLayoutProps) {
  const router = useRouter();
  return (
    <main className="relative flex items-start">
      <aside className="sticky top-0 flex h-screen w-[250px] flex-col border-r pb-5">
        <div className="border-b px-5 py-3">
          <Link href={"/"}>
            <Image src={IM_HeroLogo} alt="sacin.org.ng" className="w-[150px]" />
          </Link>
        </div>

        <ul className="mt-6 grid gap-2 px-5">
          {dashboardNavigation.map((navItem) => (
            <li key={navItem.href} className="hover:bg-gray-50">
              <Link
                href={navItem.href}
                className={`block rounded-md px-4 py-2.5 text-sm ${
                  router.pathname.includes(navItem.href)
                    ? "bg-green-100 font-semibold text-green-700"
                    : "text-[#949494]"
                }`}
              >
                {navItem.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t px-5 pt-3">
          <div>
            <img />
            <div>
              <h4 className="text-sm font-semibold">
                {props.user?.firstName} {props.user?.lastName}
              </h4>
              <p className="text-xs text-gray-500">System Administrator</p>
            </div>
          </div>
          <button className="mt-6 block text-xs font-semibold text-gray-400 hover:text-red-500">
            Logout
          </button>
        </div>
      </aside>
      <section className="min-h-screen flex-grow bg-gray-50 px-7 py-10">
        <div className="mb-8">
          {props.title && (
            <h1 className="flex items-start gap-2 text-3xl font-medium">
              {props.title}
            </h1>
          )}
          {props.subtitle && (
            <p className="text-sm text-gray-400">{props.subtitle}</p>
          )}
        </div>
        {props.children}
      </section>
    </main>
  );
}
