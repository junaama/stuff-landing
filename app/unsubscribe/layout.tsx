

import Footer from "@/components/footer";
import Header from "@/components/header";


export default function UnsubscribeLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col items-center relative overflow-hidden bg-white dark:bg-stone-900">
            <Header />
            {children}
            <Footer />
        </main>
    )
}