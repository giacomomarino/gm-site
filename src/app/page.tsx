"use client";

import CardGrid from "@/components/cardGrid";
import FollowCursor from "@/components/followCursor";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <FollowCursor />
      <div>
        <h1 className="text-7xl font-bold text-center mb-2">Giacomo Marino</h1>
        <p className="text-2xl text-center">Bioinformatician & Full Stack Developer</p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap mb-2 justify-center">
          <div className="w-full sm:w-2/3 md:w-2/4 lg:w-2/4 p-3">
            <p className="mb-5 mt-2 p-2 rounded border border-black border-opacity-0 dark:border-opacity-0 dark:border-white hover:bg-opacity-5 hover:border-opacity-20 hover:-opacity-90 hover:translate-x-1 hover:translate-y-1 hover:shadow-lg transition-all transition-duration:2s">
            I'm a full-stack developer specializing in bioinformatics. For three years, I worked as a{" "}
            <span style={{ fontStyle: "italic" }}>
              Bioinformatics Software Engineer
            </span>{" "}
            at the Ma&apos;ayan Laboratory at the Icahn School of Medicine at Mount Sinai, where I developed web servers and bioinformatics tools. 

            I graduated from Brown University in 2022 with an <i>ScB</i> in Neuroscience and an <i>AB</i> in Computer Science. I'm now headed to Yale University to pursue a PhD in the Computational Biology and Biomedical Informatics program.

            Check out one of my recent projects:
            </p>
          </div>
          <div className="w-full sm:w-auto justify-center items-center">
            <img
              className="rounded-lg border-4 my-auto mx-auto border-white-500"
              src="headshot.jpg"
              width={135}
              height={135}
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
