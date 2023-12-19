import CardGrid from '@/components/cardGrid'

export default function Projects() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mb-5">
                <div className='p-3 text-center text-lg'>
                    A comphrensive list of projects I've led or contributed to. All are open source and available on GitHub:
                </div>
            </div>
            <div className="flex flex-row justify-center mx-auto px-14">
                <CardGrid colLength={3} maxrows={100}/>
            </div>
        </div>
    )
}
