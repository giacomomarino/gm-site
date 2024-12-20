'use client'
import CardGrid from '@/components/cardGrid'
import FollowCursor from '@/components/followCursor'

export default function Projects() {
    return (
        <div className="flex flex-col items-center justify-center">
            <FollowCursor/>
            <div className="mb-5">
                <div className='p-3 text-center text-lg'>
                    A list of projects I&apos;ve led or contributed to. All are open source and available on GitHub:
                </div>
            </div>
            <div className="flex flex-row justify-center mx-auto px-14">
                <CardGrid colLength={3} maxrows={100}/>
            </div>
        </div>
    )
}
