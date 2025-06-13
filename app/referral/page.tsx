'use client'
import { WaitlistForm } from "@/components/waitlist-form";
import { useSearchParams } from "next/navigation";

export default function JoinReferralPage() {
    const searchParams = useSearchParams();
    const referralId = searchParams.get('ref');
    return (
        <div className="flex flex-col items-center justify-center w-full flex-1 max-w-2xl py-12 z-10 gap-2">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold font-horizons text-center leading-none mb-4">
                Stuff
            </h1>
            <h2 className="text-xl md:text-3xl lg:text-5xl font-extrabold font-horizons text-center leading-none -mt-6 mb-4">
                Marketplace
            </h2>

            <h3 className="text-xl md:text-4xl font-newsreader text-center mb-8 leading-tight">
                The Marketplace built <span className="italic">for New York City</span>.
            </h3>

            <WaitlistForm ref={referralId || ''} />
        </div>


    )
}