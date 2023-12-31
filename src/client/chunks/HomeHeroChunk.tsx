import React, { ReactNode } from "react";
import {
  IM_HeroBackground,
  IM_HeroLogo,
  IM_HoriDivider,
} from "../assets/images";
import Image from "next/image";
import Link from "next/link";

function useHomeHeroChunk() {
  const navigationItems = [
    { id: 1, name: "Activities", path: "/activities" },
    // { id: 2, name: "News", path: "/news" },
    { id: 3, name: "About us", path: "#about-us" },
    { id: 4, name: "Contact us", path: "#contact-us" },
  ];
  return { navigationItems };
}

function HomeHeroChunkUI(props: HomeHeroChunk.Props) {
  return (
    <section className="relative min-h-[500px] pb-16 pt-14 text-white md:pb-32">
      <img
        src={IM_HoriDivider.default.src}
        alt=""
        className="absolute bottom-0 z-[1] h-[6px] w-full object-cover"
      />
      <Image
        src={IM_HeroBackground}
        alt="sacin.org.ng"
        fill
        className="object-cover"
      />
      <div className="relative z-[1] mx-auto w-11/12 max-w-[1400px]">
        <header className="flex items-center justify-between">
          <Link href={"/"}>
            <Image
              src={IM_HeroLogo}
              alt="sacin.org.ng"
              className="w-[65%] md:w-[300px]"
            />
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-10">
              {props.navigationItems.map((item) => (
                <li key={item.id} className="font-semibold">
                  <Link href={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div className="mt-24 md:mt-32">
          <h1 className="max-w-5xl font-clash text-3xl font-bold capitalize leading-normal md:text-6xl md:leading-normal">
            {props.title ??
              "promoting the science and technology of control systems in all its ramifications"}
          </h1>

          <p>{props.subtitle}</p>
          {/* <button className="mt-8 rounded-md bg-[#5EFF48] px-6 py-3 font-medium text-black">
            Become a Member
          </button> */}
        </div>
      </div>
    </section>
  );
}

export const HomeHeroChunk = {
  UI: HomeHeroChunkUI,
  use: useHomeHeroChunk,
};
export namespace HomeHeroChunk {
  export type Props = ReturnType<typeof useHomeHeroChunk> & {
    title?: ReactNode;
    subtitle?: ReactNode;
  };
}
