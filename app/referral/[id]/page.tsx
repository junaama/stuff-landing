'use client'
import { Button } from '@/components/ui/button'
import { use, useState } from 'react'
import { toast } from 'sonner'
interface ReferralPageProps {
    params: Promise<{ id: string }>
}
export default function ReferralPage({ params }: ReferralPageProps) {
    const { id } = use(params)
    const [showGif, setShowGif] = useState(false);
    const shareData = {
        title: "Hey there's a new secondhand marketplace called STUFF that's coming soon 👀",
        text: "Join me and get early access!",
        url: `https://getstuff.city/referral?ref=${id}`,
    };

    const handleClick = () => {
        if (navigator.share) {
            navigator.share(shareData)
                .then(() => setShowGif(true))
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
        setShowGif(true);

    }

    const copyLink = () => {
        navigator.clipboard.writeText(shareData.url);
        toast.success('Referral link copied to clipboard')
        setShowGif(true);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100">
            <h1 className="text-3xl font-bold mb-4 font-horizons text-center">Thanks for supporting Stuff!</h1>
            <div className="transition-all duration-1200 ease-in-out">
                {showGif ? (
                    <video
                        src="/hotstuff.mov"
                        autoPlay
                        loop
                        muted
                        className="max-w-xs mx-auto mb-8 animate-fade-in"
                    />
                ) : (
                    <p className="text-lg mb-8 font-light text-center font-inter animate-fade-in">
                        Share STUFF with a friend with your unique referral link for a surprise :)
                    </p>
                )}
            </div>

            <Button onClick={handleClick} className="bg-blue-500"> Share referral link</Button>
            <Button className="underline mt-2" variant="link" onClick={copyLink}>Copy link</Button>
        </div >
    )
}