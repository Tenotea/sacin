import Image from "next/image";
import { Icon } from "@iconify/react";
import { IM_HeroLogo } from "../assets/images";

export class PageFooterChunk {
  static Default() {
    const props = PageFooterChunk.Use();
    return <PageFooterChunk.UI {...props} />;
  }

  static UI(props: PageFooterChunk.Props) {
    return (
      <footer className="bg-black py-24 text-white">
        <div className="mx-auto grid w-11/12 max-w-[1400px] grid-cols-5 items-center gap-10">
          <div className="col-span-2">
            <Image src={IM_HeroLogo} alt="sacin.org.ng" />

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
                href="mailto:secretary@sacin.org.ng"
                className="-mt-2 block max-w-max text-lg font-semibold text-[#5EFF48]"
              >
                support@sacin.org.ng
              </a>
            </div>
          </div>
          <div className="col-span-3 grid grid-cols-3">
            <div>
              <h6 className="mb-3 font-clash text-xl font-semibold">
                Activities
              </h6>
              <p className="mb-1 opacity-80">Past Activities</p>
              <p className="mb-1 opacity-80">Upcoming Activities</p>
              <p className="mb-1 opacity-80">Participation Guide</p>
            </div>
            <div>
              <h6 className="mb-3 font-clash text-xl font-semibold">
                Publications
              </h6>
              <p className="mb-1 opacity-80">News</p>
              <p className="mb-1 opacity-80">Articles</p>
              <p className="mb-1 opacity-80">Research Papers</p>
            </div>
            <div>
              <h6 className="mb-3 font-clash text-xl font-semibold">
                About us
              </h6>
              <h6 className="mb-3 font-clash text-xl font-semibold">Login</h6>
              <h6 className="mb-3 font-clash text-xl font-semibold">
                Become a Member
              </h6>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  static Use() {
    return {};
  }
}

export namespace PageFooterChunk {
  export type Props = ReturnType<typeof PageFooterChunk.Use>;
}
