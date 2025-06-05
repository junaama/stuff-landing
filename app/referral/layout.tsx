import Footer from "@/components/footer";
import Header from "@/components/header";
import { Suspense } from "react";


export default function ClaimLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col items-center relative overflow-hidden bg-white dark:bg-stone-900">
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                {children}
                <Footer />
            </Suspense>
        </main>
    )
}