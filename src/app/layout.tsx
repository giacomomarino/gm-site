import type { Metadata } from 'next'
import './globals.css'
import Nav from './nav'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Raleway } from 'next/font/google';


const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Giacomo Marino',
  description: 'Full Stack Dev & Bioinformatician',

}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={` ${raleway.className} m-0`}>
      <body className='min-h-screen flex flex-col p-0 m-0' id="following">
        <header>
          <Nav />
        </header>
        <main>
          {children}
        </main>
        <div className="bottom-0 relative pb-0 mb-0 w-full mt-auto">
          <div className='text-neutral-content flex place-content-evenly bg-opacity-5 p-10'>
            <div className="text-center">
              <p className='px-2'>
                <Link href="mailto:giacomobmarino@gmail.com" target="_blank" rel="noopener noreferrer">
                  <Image src={'/mail-logo.png'} width={65} height={65} alt={'Mail'} />
                </Link>
              </p>
            </div>
            <div className="text-center">
              <p className='px-2'>
                <Link href="https://github.com/giacomomarino" target="_blank" rel="noopener noreferrer">
                  <Image src={'/github-logo.png'} width={65} height={65} alt={'GitHub'} />
                </Link>
              </p>
            </div>
            <div className="text-center">
              <p className='px-2'>
                <Link href="https://www.linkedin.com/in/giacomo-marino-bb6b09b0/" target="_blank" rel="noopener noreferrer">
                  <Image src={'/linkedin-logo.png'} width={65} height={65} alt={'LinkedIn'} />
                </Link>
              </p>
            </div>
            <div className="text-center">
              <p className='px-2'>
                <Link href="https://orcid.org/0009-0005-9727-559X" target="_blank" rel="noopener noreferrer">
                  <Image className=" rounded-full dark:border dark:border-white dark:border-opacity-20" src={'/orcid-logo.png'} width={65} height={65} alt={'ORCID'} />
                </Link>
              </p>
            </div>
            <div className="text-center">
              <p className='px-1'>
                <Link href="https://scholar.google.com/citations?user=t-V9UhIAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
                  <Image className="rounded-full" src={'/google-scholar-logo.png'} width={68} height={65} alt={'Google Scholar'} />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
