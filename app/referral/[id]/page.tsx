'use client'
import { Button } from '@/components/ui/button'
import { use } from 'react'
import { toast } from 'sonner'
interface ReferralPageProps {
    params: Promise<{ id: string }>
}
export default function ReferralPage({ params }: ReferralPageProps) {
    const { id } = use(params)
    const shareData = {
        title: "Stuff Marketplace",
        text: "Get early access to Stuff marketplace",
        url: `https://getstuff.city/referral?ref=${id}`,
    };

    const handleClick = () => {
        if (navigator.share) {
            navigator.share(shareData)
                .catch((error) => console.log('Error sharing:', error));
        } else {
            navigator.clipboard.writeText(shareData.url)
                .then(() => {
                    toast.success('Referral link copied to clipboard!');
                })
                .catch((error) => {
                    console.error('Error copying to clipboard:', error);
                    toast.error('Failed to copy referral link');
                });
        }
    }

    const copyLink = () => {
        navigator.clipboard.writeText(shareData.url);
        toast.success('Referral link copied to clipboard')
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100">
            <h1 className="text-3xl font-bold mb-4 font-horizons text-center">Thanks for supporting Stuff!</h1>
            <p className="text-lg mb-8 font-light text-center font-inter">Get a friend on the waitlist with your unique referral link.</p>

            <Button onClick={handleClick} className="bg-blue-500"> Share referral link</Button>
            <Button className="underline mt-2" variant="link" onClick={copyLink}>Copy link</Button>
        </div >
    )
}