import type { Metadata } from 'next'
import './globals.css'
import Nav from './nav'
import Link from 'next/link'
import Image from 'next/image'

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
    <html lang="en" className={` ${raleway.className}`}>
      <body className='min-h-screen flex flex-col'>
        <header>
          <Nav />
        </header>
        <main>
          {children}
        </main>
        <footer className="flex-none">
          <div className='text-neutral-content flex place-content-evenly bg-opacity-5 p-6' style={{position: 'relative', bottom: '0px', width: '100%'}}>
            <div className="text-center pt-2">
              <p>
                <Link href="mailto:giacomobmarino@gmail.com" target="_blank" rel="noopener noreferrer">
                  <Image src={'/mail-logo.png'} width={65} height={250} alt={'Mail'} />
                </Link>
              </p>
            </div>
            <div className="text-center">
              <p>
                <Link href="https://github.com/giacomomarino" target="_blank" rel="noopener noreferrer">
                  <Image src={'/github-logo.png'} width={150} height={250} alt={'GitHub'} />
                </Link>
              </p>
            </div>
            <div className="text-center pt-2">
              <p>
                <Link href="https://www.linkedin.com/in/giacomo-marino-bb6b09b0/" target="_blank" rel="noopener noreferrer">
                  <Image src={'/linkedin-logo.png'} width={65} height={65} alt={'LinkedIn'} />
                </Link>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
