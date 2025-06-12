import { AlertCircleIcon } from "lucide-react";

export default function Header() {
    return (
        <><header className="w-full py-4 bg-stone-100 dark:bg-stone-800 text-center z-10 flex flex-col md:flex-row md:gap-2 items-center justify-center">
            <p className="text-md md:text-lg font-light font-newsreader">
                No time for flaking or ghosting.

            </p>
            <p className="text-md md:text-lg font-light font-newsreader">
                Connecting buyers and sellers to get stuff sold.
            </p>

        </header>
            {process.env.NEXT_PUBLIC_SERVICE_STATUS === 'TRUE' && (<div className="w-full pb-4 bg-stone-100 dark:bg-stone-800 flex text-red-500 gap-2 justify-center">
                <AlertCircleIcon width={16} />
                <p className="text-md md:text-lg font-newsreader text-red-500"> We are currently facing service outages. Please try again later.
                </p>
            </div>)}
        </>
    )
}