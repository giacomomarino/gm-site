import CardGrid from '@/components/cardGrid'
import { Card } from '@mui/material'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-5">
        <h1 className="text-7xl font-bold text-center mb-2">Giacomo Marino</h1>
        <p className="text-2xl text-center">
          Full Stack Developer & Bioinformatician
        </p>
        <div className='w-full mx-auto xl:w-1/2 sm:w-full md:w-full lg:w-1/2'>
          <p className='mt-5 p-5 rounded border border-black border-opacity-0 dark:border-opacity-0 dark:border-white hover:bg-opacity-5 hover:border-opacity-90 hover:-opacity-90 hover:translate-x-1 hover:translate-y-1'>
            I am a full stack developer and bioinformatician with a passion for data science and machine learning.
            I am currently working as a <span style={{ fontStyle: "italic" }}>Bioinformatics Software Engineer</span> at the Ma&apos;ayan Laboratory at the Ichan School of Medicine at Mount Sinai,
            where I am involved in development of web severs and bioinformatic tools. I graduated from Brown University in 2022 with a <i>ScB</i> in Neuroscience <i>AB</i> in Computer Science.
            I am particularily interested in the intersection of neuroscience and computer science, and the use of computational methods to accelerate biological discovery. Here are some of my highlighted projects:
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-center mx-auto">
      <CardGrid colLength={2} maxrows={2} />
      </div>
    </div>
  )
}
