export class AboutUsChunk {
  static Default() {
    const props = AboutUsChunk.Use();
    return <AboutUsChunk.UI {...props} />;
  }

  static UI(props: AboutUsChunk.Props) {
    return (
      <section id="about-us" className="bg-[#062602] py-24">
        <div className="mx-auto w-11/12 max-w-[1400px]">
          <h4 className="font-clash text-4xl font-medium text-white">
            About Us
          </h4>
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <div className="">
              <h5 className="font-clash text-2xl font-semibold text-[#5EFF48]">
                Our Mission
              </h5>
              <p className="mt-3 max-w-lg text-white">
                To promote the science and technology of automation, control and
                instrumentation through organization of seminars, technical
                meetings, publications and others means in line with the
                objectives of SACIN
              </p>
            </div>
            <div className="">
              <h5 className="font-clash text-2xl font-semibold text-[#5EFF48]">
                Our Vision
              </h5>
              <p className="mt-3 max-w-lg text-white">
                For SACIN to be the national body for promoting automation,
                control and instrumentation for societal development
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  static Use() {
    return {};
  }
}

export namespace AboutUsChunk {
  export type Props = ReturnType<typeof AboutUsChunk.Use>;
}
