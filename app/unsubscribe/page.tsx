import { Suspense } from 'react';
import UnsubscribeLogic from './unsubscribe-logic';

export default function UnsubscribePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-3xl font-bold mb-4 font-horizons text-center">Unsubscribe from Stuff</h1>
            <Suspense fallback={<p className="font-inter">Loading unsubscribe link...</p>}>
                <UnsubscribeLogic />
            </Suspense>
        </div>
    );
}


