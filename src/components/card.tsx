import React from "react";

export default function AppCard({ lang, title, tagline, description, link }: { lang: string, title: string, tagline: string, description: string, link: string }) {
  return (
    <div className="relative flex flex-col bg-gray-500 dark:bg-white dark:bg-opacity-10 bg-opacity-10 shadow-md bg-clip-border rounded-xl border border-black border-opacity-0 dark:border-opacity-0 dark:border-white hover:border-opacity-90 hover:bg-opacity-5 hover:translate-x-1 hover:translate-y-1">
      <div className="p-6">
        <i className="text-sm">{lang}</i>
        <h5 className="block m-2 ml-0 text-xl">
          {title}
        </h5>
        <i>{tagline}</i>
        <div className="m-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full p-1">
        </div>
        <div className="antialiased font-light leading-relaxed" style={{height: "115px", overflow: "hidden"}}>
          <div className={"pb-3"} style={{display: "-webkit-box", WebkitLineClamp: "3", textOverflow: "ellipsis"}}></div>
          {description}...
        </div>
        
      </div>
      <div className="p-6 pt-0">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <button className="border bg-opacity-0 dark:bg-opacity-0  mb-2 text-sm p-2 rounded-md font-light  hover:bg-opacity-5 border-black bg-black   dark:border-white dark:bg-white hover:border-2">
            EXPLORE PROJECT
          </button>
        </a>
      </div>
    </div>
    )
};
