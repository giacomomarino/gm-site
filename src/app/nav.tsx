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
        <div className="navbar-center">
       
        </div>
        <div className="navbar-center ">
       
            
          <ul className="menu menu-horizontal gap-5 flex text-lg m-5 justify-center">
            <Link
                href="/"
                shallow><Image className='dark:invert' src={'/logo-transparent-black.png'} alt="GM" width={120} height={50}/>
              </Link>
            <>
           <li className={classNames('bg-white bg-opacity-10 rounded-md p-2 hover:bg-opacity-5 hover:text-gray-700 shadow-md max-h-10', {'border  dark:border-white border-black border-opacity-40': pathname === '/' })}
            style={{maxHeight: "44px"}}>
              <Link
                href="/"
                shallow>About</Link></li>
           <li className={classNames('bg-white bg-opacity-10 rounded-md p-2 hover:bg-opacity-5 hover:text-gray-700  shadow-md max-h-10', {'border  border-white border-opacity-40': pathname === '/projects' })}
            style={{maxHeight: "44px"}}>
              <Link
                href="/projects"
                shallow>Projects</Link></li>
          <li className={classNames('bg-white bg-opacity-10 rounded-md p-2 hover:bg-opacity-5 hover:text-gray-700  shadow-md max-h-10', {'border  border-white border-opacity-40': pathname === '/publications' })}
          style={{maxHeight: "44px"}}>
              <Link
                href="/publications"
                shallow>Publications</Link></li>
                </>
          </ul> 
        </div>
      </div >
    </>
  )
}

