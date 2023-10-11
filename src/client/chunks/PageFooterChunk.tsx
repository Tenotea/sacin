import Image from "next/image";
import { Icon } from "@iconify/react";
import { IM_HeroLogo } from "../assets/images";
import React from "react";
import Link from "next/link";

export namespace PageFooterChunkNameSpace {
  export type Props = ReturnType<typeof PageFooterChunk.Use>;
}
interface PageFooterChunkAttributes {
  Default: () => React.JSX.Element;
  UI: (props: PageFooterChunkNameSpace.Props) => React.JSX.Element;
  Use: () => {};
}

export const PageFooterChunk: PageFooterChunkAttributes = {
  Default() {
    const props = PageFooterChunk.Use();
    return <PageFooterChunk.UI {...props} />;
  },

  UI(props: PageFooterChunkNameSpace.Props) {
    return (
      <footer className="bg-black py-24 text-white">
        <div className="mx-auto grid w-11/12 max-w-[1400px] items-center gap-10 sm:grid-cols-5">
          <div className="col-span-2">
            <Image src={IM_HeroLogo} alt="sacin.org.ng" className="w-3/4" />

            <div className="mt-5">
              <p className="mb-1">Connect with us:</p>
              <div className="flex items-center gap-4">
                <Icon icon="formkit:twitter" />
                <Icon icon="ic:outline-facebook" />
                <Icon icon="icomoon-free:linkedin" />
              </div>
            </div>

            <div className="mt-8">
              <p className="">or send us an email at:</p>
              <a
                href="mailto:info@sacin.org.ng"
                className="-mt-2 block max-w-max text-lg font-semibold text-[#5EFF48]"
              >
                info@sacin.org.ng
              </a>
            </div>
          </div>
          <div className="grid gap-10 lg:col-span-3 lg:grid-cols-3">
            <div>
              <h6 className="mb-3 font-clash text-xl font-semibold">
                Activities
              </h6>
              <Link href={"/activities"} className="block max-w-max">
                <p className="mb-1 opacity-80">Upcoming Activities</p>
              </Link>
              <Link href={"#"} className="block max-w-max">
                <p className="mb-1 opacity-80">Participation Guide</p>
              </Link>
            </div>
            <div>
              <h6 className="mb-3 font-clash text-xl font-semibold">
                Publications
              </h6>
              <Link href={"#"} className="block max-w-max">
                <p className="mb-1 opacity-80">News</p>
              </Link>
              <Link href={"#"} className="block max-w-max">
                <p className="mb-1 opacity-80">Articles</p>
              </Link>
              <Link href={"#"} className="block max-w-max">
                <p className="mb-1 opacity-80">Research Papers</p>
              </Link>
            </div>
            <div>
              <Link href={"#about-us"} className="block max-w-max">
                <h6 className="mb-3 font-clash text-xl font-semibold">
                  About us
                </h6>
              </Link>
              <Link href={"#"} className="block max-w-max">
                <h6 className="mb-3 font-clash text-xl font-semibold">Login</h6>
              </Link>
              <Link href={"#"} className="block max-w-max">
                <h6 className="mb-3 font-clash text-xl font-semibold">
                  Become a Member
                </h6>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  },

  Use() {
    return {};
  },
};
