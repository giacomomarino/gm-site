"use client";

import CardGrid from "@/components/cardGrid";
import FollowCursor from "@/components/followCursor";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <FollowCursor></FollowCursor>
      <div>
        <h1 className="text-7xl font-bold text-center mb-2">Giacomo Marino</h1>
        <p className="text-2xl text-center">Full Stack Developer</p>
        <div className="flex flex-row mb-2 justify-center">
          <div className=" w-1/3 float-right sm:w-full md:w-2/4 lg:w-2/4 xl:w-2/4">
            <p className="m-3 mb-5 mt-2 p-2 rounded border border-black border-opacity-0 dark:border-opacity-0 dark:border-white hover:bg-opacity-5 hover:border-opacity-20 hover:-opacity-90 hover:translate-x-1 hover:translate-y-1 hover:shadow-lg transition-all">
              I am a full stack developer working in bioinformatics with a
              passion for data science and machine learning. I am currently
              working as a{" "}
              <span style={{ fontStyle: "italic" }}>
                Bioinformatics Software Engineer
              </span>{" "}
              at the Ma&apos;ayan Laboratory at the Icahn School of Medicine at
              Mount Sinai, where I am involved in development of web severs and
              bioinformatics tools. I graduated from Brown University in 2022
              with a <i>ScB </i> in Neuroscience & <i>AB </i> in Computer
              Science. I am particularly interested in the intersection of
              neuroscience and computer science, and the use of computational
              methods to accelerate biological discovery. Here is one of my
              recent highlighted projects:
            </p>
          </div>
          <div className="col-span-2 align-middle my-auto">
            <img
              className="rounded-lg border-4 border-white-500  my-auto"
              src="headshot.jpg"
              width={175}
              height={175}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <CardGrid colLength={1} maxrows={1} />
      </div>
    </div>
  );
}
