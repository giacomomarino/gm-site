'use client'

import FollowCursor from "@/components/followCursor";


export default function Experience() {
    return (
    <div className="w-full mx-auto xl:w-1/2 sm:w-full md:w-full lg:w-1/2 p-10 pt-0">
        <FollowCursor/>
        <div className="text-center text-lg mb-2">
            <p>Giacomo B. Marino</p>
            <p className="text-light">Brooklyn, NY | giacomobmarino@gmail.com</p>
        </div>
        <div className="text-justify">
        <h2 className="text-4xl mb-2">Education</h2>
        <p className="text-lg"><b>Brown University</b>, Neuroscience <i>ScB</i> & Computer Science <i>AB</i>, May 2022</p>
        <ul className="list-disc ml-5 mb-2">
            <li>Magna Cum Laude</li>
        </ul>
       
        <p className="text-lg"><b>Phillips Academy Andover</b>, June 2018</p>
        <ul className="list-disc ml-5 mb-2">
            <li>XC country and track and field captain</li>
            <li>Resident advisor</li>
        </ul>
       

        <h2 className="text-4xl mb-2 mt-3">Work Experience</h2>

        <p className="text-lg"><b><a href="https://labs.icahn.mssm.edu/maayanlab/" target="_blank"><u>Ma&apos;ayan Lab</u></a>, Icahn School of Medicine, Mount Sinai </b> | New York, NY (July 2022-Current)</p>
        <p className="text-lg"><i>Bioinformatics Software Engineer</i></p>
        <ul className="list-disc ml-5 mb-2">
            <li>Developed multiple full stack web applications published in several high-impact scientific journals</li>
            <li>Performed analysis, data normalization, and standardization, on multiple large genomic-related datasets</li>
            <li>Trained and managed 8 summer interns in their independent bioinformatics projects</li>
        </ul>

        <p className="text-lg"><b><a href="https://polleylab.meei.harvard.edu/" target="_blank"><u>Polley Lab</u></a>, EPL, Massachusetts Eye and Ear </b>| Boston, MA (May 2021 - August 2021)</p>
        <p className="text-lg"><i>Research Intern</i></p>
        <ul className="list-disc ml-5 mb-2">
            <li>Worked in the tinnitus research center on EEG experiment design, data collection, and analysis</li>
            <li>Independently developed an analysis pipeline in MATLAB for discerning the strength of auditory steady-state response for a 40Hz signal administered under different conditions as well as scoring participants&apos; ability to distinguish sounds in a crowded soundscape</li>
        </ul>

        <p className="text-lg"><b><a href="https://www.kids4coding.com/" target="_blank"><u>Kids 4 Coding</u></a>, </b>| Remote (June 2021 - August 2021)</p>
        <p className="text-lg"><i>Instructor</i></p>
        <ul className=" list-disc ml-5 mb-2">
            <li>Led daily classes for five middle schoolers with personalized instruction</li>
            <li>Taught classes including Minecraft Modding (Java), Python 1, and Unity/C# game design</li>
            <li>Set the pace of the class and assessed the progress of the individual students as to best teach to the group</li>
        </ul>

        <p className="text-lg"><b><a href="https://cs.brown.edu/" target="_blank"><u>Department of Computer Science</u></a>, Brown University </b>| Providence, RI (August 2020 - December 2020)</p>
        <p className="text-lg"><i>Undergraduate Teaching Assistant</i></p>
        <ul className="list-disc ml-5 mb-2">
            <li>Served as a teaching assistant for 350+ student computer science course with a team of 40+ TAs (CSCI 0111)</li>
            <li>Led weekly lab sessions and concepts exploring relevant topics in data science and data analysis</li>
            <li>Edited and redesigned homework assignments and assisted with management of course logistics</li>
        </ul>

        <p className="text-lg"><b><a href="https://www.cogitania.com/" target="_blank"><u>Cogitania</u></a></b> | Boston, MA (September 2020 - June 2021)</p>
        <p className="text-lg"><i>Speaker/Tutor</i></p>
        <ul className="list-disc ml-5 mb-2">
            <li>Developed curriculum for high school students with limited science exposure to neuroscience/biology, with a goal of reaching more complex and specialized neurological concepts such as those surrounding dreaming and memory formation</li>
            <li>Explored topics and developed a curriculum encompassing the discussion of philosophy and consciousness</li>
        </ul>

        <p className="text-lg"><b><a href="https://www.sciencefromscientists.org/" target="_blank"><u>Science from Scientists</u></a></b> | Boston, MA (September 2020 - June 2021)</p>
        <p className="text-lg"><i>Speaker/Tutor</i></p>
        <ul className="list-disc ml-5 mb-2">
            <li>Developed curriculum for high school students with limited science exposure to neuroscience/biology, with a goal of reaching more complex and specialized neurological concepts such as those surrounding dreaming and memory formation</li>
            <li>Explored topics and developed a curriculum encompassing the discussion of philosophy and consciousness</li>
        </ul>
        </div>
    </div>)

}