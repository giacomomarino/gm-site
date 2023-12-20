'use client'

import React from 'react';
import { usePathname } from "next/navigation"
import Link from 'next/link'
import classNames from 'classnames'
import Image from 'next/image'


export default function Nav() {
  const pathname = usePathname()
  return (
    <>
      <div className="navbar block text-center">
        <div className="navbar-center "> 
          <ul className="menu menu-horizontal gap-5 flex text-lg m-5 justify-center xs:text-sm flex-wrap">
            <Link
                href="/"
                shallow><Image className='dark:invert rounded-md' src={'/logo-transparent-black.png'} alt="GM" width={70} height={50}/>
              </Link>
            <>
            <Link
                href="/"
                shallow><li className={classNames('bg-white bg-opacity-10 rounded-md p-2 items-center hover:bg-opacity-5 shadow-md max-h-10', {'border  dark:border-white border-black font-semibold border-opacity-40': pathname === '/' })}
            style={{maxHeight: "44px"}}>
              About</li></Link>
           <Link
                href="/experience"
                shallow><li className={classNames('bg-white bg-opacity-10 rounded-md p-2 hover:bg-opacity-5 shadow-md max-h-10', {'border  dark:border-white border-black font-semibold border-opacity-40': pathname === '/experience' })}
            style={{maxHeight: "44px"}}>
              Experience</li></Link>
              <Link
                href="/projects"
                shallow><li className={classNames('bg-white bg-opacity-10 rounded-md p-2 hover:bg-opacity-5 shadow-md max-h-10', {'border  dark:border-white border-black font-semibold border-opacity-40': pathname === '/projects' })}
            style={{maxHeight: "44px"}}>
             Projects</li></Link>
             <Link
                href="/publications"
                shallow><li className={classNames('bg-white bg-opacity-10 rounded-md p-2 hover:bg-opacity-5 shadow-md max-h-10', {'border  dark:border-white border-black font-semibold border-opacity-40': pathname === '/publications' })}
          style={{maxHeight: "44px"}}>
              Publications</li></Link>
                </>
          </ul> 
        </div>
      </div >
    </>
  )
}

