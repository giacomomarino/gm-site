'use client'

import React from "react";
import AppCard from "./card";
import manifest from "../app/projects-manifest.json";
import { Grid } from "@mui/material";

export default function CardGrid({ colLength, maxrows }: { colLength: number, maxrows: number }) {

   const maxCards = React.useMemo(() => colLength*maxrows, [colLength, maxrows]);

    return (<>
    
        <Grid container spacing={3} className="mx-auto pr-5" justifyContent={"center"}>
         {manifest.map((project, index) => {
                if (index >= maxCards) return null;
                return (
                    <Grid item xs={12} sm={11} md={5} lg={5} >
                        <AppCard lang={project.lang} title={project.title} tagline={project.tagline} description={project.description} link={project.link} />
                    </Grid>
                )
            })}
    
        </Grid>
    </>
            
    )
}
