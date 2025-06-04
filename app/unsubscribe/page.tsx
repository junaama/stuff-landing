'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { toast } from 'sonner';

export default function UnsubscribePage() {
    const searchParams = useSearchParams();
    const claimId = searchParams.get('cid');
    const [loading, setLoading] = useState(false);

    const handleUnsubscribe = async () => {
        if (!claimId) {
            toast.error('Invalid unsubscribe link.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/unsubscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ claimId }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.error('You have successfully unsubscribed.');
            } else {
                toast.error(data.error || 'Failed to unsubscribe.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-3xl font-bold mb-4 font-horizons text-center">Unsubscribe from Stuff</h1>
            <Suspense fallback={<p className="font-inter">Loading unsubscribe link...</p>}>
                {claimId ? (
                    <div className="bg-white p-8 rounded-lg text-center">
                        <p className="font-inter text-gray-700 mb-4">Are you sure you want to unsubscribe?</p>
                        <p className="font-inter text-gray-500 mb-6">You will no longer receive emails from us.</p>
                        <button
                            onClick={handleUnsubscribe}
                            disabled={loading}
                            className={`w-full px-4 py-2 rounded-md text-white font-inter text-sm ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                        >
                            {loading ? 'Unsubscribing...' : 'Yes, Unsubscribe'}
                        </button>
                    </div>
                ) : (
                    <p className=" font-inter">Invalid unsubscribe link.</p>
                )}
            </Suspense>
        </div>
    );
}


