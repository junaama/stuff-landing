import React from 'react'

interface ClaimPageProps {
  params: { id: string }
}

export default function ClaimPage({ params }: ClaimPageProps) {
  const { id } = params

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 font-horizons">Thanks for supporting Stuff!</h1>
        <p className="text-lg mb-8 font-inter">We'll let you know when the product is ready.</p>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Choose your username"
            className="w-full px-4 py-2 text-md font-inter rounded-[24px] border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 dark:focus:ring-stone-700"
          />
          <button
            className="w-full py-4 bg-stone-100 dark:bg-stone-800 text-sm font-inter font-light rounded-[16px] text-stone-900 dark:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Claim Username
          </button>
        </div>
        {/* <p className="mt-4 text-sm font-inter text-stone-600 dark:text-stone-400">Your claim ID: {id}</p> */}
      </div>
    </div>
  )
} 