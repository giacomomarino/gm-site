"use client";

import React from "react";
import worklicationsInfo from "../publications.json";
import FollowCursor from "@/components/followCursor";

const boldString = (str: string, substr: string) => str.replaceAll(substr, `<b>${substr}</b>`);

export default function Publications() {
  return (
    <div className="flex flex-col items-center justify-center">
      <FollowCursor />
      <div className="mb-5 px-3 p-5">
        <div className="text-center">
          {worklicationsInfo.publications.map((work, index) => {
            return (
              <div
                className="text-justify text-lg"
                style={{ maxWidth: 1000 }}
                key={index}
              >
                <p className="m-3 mb-3">
                  {work.contributors
                    .map((el, authorIdx) => {
                        if (el.includes('Marino')) return <><b>{el}</b>, </>
                        else if (authorIdx == work.contributors.length - 1) return <>{el.replace(",", "&apos;")}</>
                        return <>{el.replace(",", "&apos;")}, </>
                    }  
                    )}
                  . {work.date.split("-")[0]}. <b>{work.title}</b>{" "}
                  <i>{work.journal}</i>.
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.doi.org/${work.doi}`}
                  >
                    {" "}
                    {work.doi}
                  </a>
                </p>
                <div className="flex space-x-1 items-center justify-start ml-5 mb-2">
                  {work.pmid && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://pubmed.ncbi.nlm.nih.gov/${work.pmid}/`}
                    >
                      <button className="border bg-opacity-0 dark:bg-opacity-0 mb-2 text-sm p-2 rounded-md hover:font-semibold hover:bg-opacity-5 border-black bg-black dark:border-white dark:bg-white hover:border-2">
                        PubMed
                      </button>
                    </a>
                  )}
                  {work.pmc && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.ncbi.nlm.nih.gov/pmc/articles/${work.pmc}/`}
                    >
                      <button className="border bg-opacity-0 dark:bg-opacity-0  mb-2 text-sm p-2 rounded-md font-light hover:font-semibold hover:bg-opacity-5 border-black bg-black dark:border-white dark:bg-white hover:border-2">
                        PMC
                      </button>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
