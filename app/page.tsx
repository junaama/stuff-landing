"use client"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { StampCanvas } from "@/components/stamp-canvas"
import { WaitlistForm } from "@/components/waitlist-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center relative overflow-hidden bg-white dark:bg-stone-900">

      <Header />
      <div className="flex flex-col items-center justify-center w-full flex-1 max-w-xl py-12 z-10 gap-2">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold font-horizons text-center leading-none mb-4">
          getstuff.city
        </h1>

        <h2 className="text-xl md:text-4xl font-newsreader text-center mb-8 leading-tight">
          The marketplace built <span className="italic">for New York</span>.
        </h2>

        <WaitlistForm />
      </div>


      <Footer />
      <StampCanvas />
    </main>
  )
}
