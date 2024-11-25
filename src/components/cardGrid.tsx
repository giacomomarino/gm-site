'use client'
import React from "react";
import AppCard from "./card";
import manifest from "../app/projects-manifest.json";

export default function CardGrid({ colLength, maxrows }: { colLength: number, maxrows: number }) {
    var maxCards = 100
    var wordcount = 1000
    if (colLength === 1) {
        return (
            <div className="justify-center p-10 pt-0 pb-0" style={{ display: "flex col", container: "initial", gridRow: "auto", transition: "all 5s ease-in-out" }}>
                {manifest.slice(0, 1).map((project, index) => {
                    if (index >= maxCards) return null;
                    return (
                        <div key={index} className="w-full mx-auto xl:3/4 sm:w-full md:w-full lg:w-3/4">
                            <AppCard wordcount={wordcount} lang={project.lang} title={project.title} tagline={project.tagline} description={project.description} link={project.link} github={project.github} />
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="flex-wrap lg:flex xl:flex justify-center">
            <div className="pt-0" style={{ display: "flex col", container: "initial", gridRow: "auto", transition: "all 1s ease-in-out" }}>
                {manifest.map((project, index) => {
                    if (1 == (index % 2)) return null;
                    return (
                        <div key={index} className="mx-auto mb-6" style={{ minWidth: "100px", maxWidth: "650px"}}>
                            <AppCard wordcount={wordcount} lang={project.lang} title={project.title} tagline={project.tagline} description={project.description} link={project.link} github={project.github} />
                        </div>
                    )
                })}
            </div>
            <div className="pt-0 lg:pl-6" style={{ display: "flex col", container: "initial", gridRow: "auto", transition: "all 1s ease-in-out" }}>
                {manifest.map((project, index) => {
                    if (0 == (index % 2)) return null;
                    return (
                        <div key={index} className="mx-auto mb-6" style={{ minWidth: "100px", maxWidth: "650px"}}>
                            <AppCard wordcount={wordcount} lang={project.lang} title={project.title} tagline={project.tagline} description={project.description} link={project.link} github={project.github} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
