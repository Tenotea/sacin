import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IM_ArticleCardBackground } from "~/client/assets/images";

export class HomeArticlesChunk {
  static Default() {
    const props = HomeArticlesChunk.Use();
    return <HomeArticlesChunk.UI {...props} />;
  }

  static UI(props: HomeArticlesChunk.Props) {
    return (
      <section>
        <div className="mx-auto w-11/12 max-w-[1400px] py-16">
          <div className="flex items-center justify-between">
            <h2 className="font-clash text-3xl font-semibold">
              News and Articles
            </h2>
            <Link href="/activities">View All</Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {props.articles.map((ar) => (
              <div key={ar.id} className="relative border px-8 py-14">
                <img
                  src={IM_ArticleCardBackground.default.src}
                  alt=""
                  className="absolute left-0 top-0 -z-[1] h-full w-full object-cover"
                />
                <h6 className="text-xl font-bold">{ar.name}</h6>
                <p className="mt-6 text-gray-600">{ar.description}</p>
                <Link
                  href={
                    "/news/2022-04-20/keynote-speech-ifac-world-congress-2023-yokohama-japan"
                  }
                  className="text-medium ml-auto mt-5 block max-w-max font-clash text-sm underline"
                >
                  Read more
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  static Use() {
    const articles = [
      {
        id: 1,
        name: "KEYNOTE SPEECH: IFAC World Congress 2023,Yokohama, JAPAN",
        description:
          "The idea is to form an orchestra ensemble including only musicians from the automatic control community...",
      },
      {
        id: 2,
        name: "KEYNOTE SPEECH: IFAC World Congress 2023,Yokohama, JAPAN",
        description:
          "The idea is to form an orchestra ensemble including only musicians from the automatic control community...",
      },
      {
        id: 3,
        name: "KEYNOTE SPEECH: IFAC World Congress 2023,Yokohama, JAPAN",
        description:
          "The idea is to form an orchestra ensemble including only musicians from the automatic control community...",
      },
      {
        id: 4,
        name: "KEYNOTE SPEECH: IFAC World Congress 2023,Yokohama, JAPAN",
        description:
          "The idea is to form an orchestra ensemble including only musicians from the automatic control community...",
      },
      {
        id: 5,
        name: "KEYNOTE SPEECH: IFAC World Congress 2023,Yokohama, JAPAN",
        description:
          "The idea is to form an orchestra ensemble including only musicians from the automatic control community...",
      },
      {
        id: 6,
        name: "KEYNOTE SPEECH: IFAC World Congress 2023,Yokohama, JAPAN",
        description:
          "The idea is to form an orchestra ensemble including only musicians from the automatic control community...",
      },
    ];
    return { articles };
  }
}

export namespace HomeArticlesChunk {
  export type Props = ReturnType<typeof HomeArticlesChunk.Use>;
}
