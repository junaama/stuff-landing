'use client'
import { createClient } from '@supabase/supabase-js'
import React, { useState, use, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface ClaimPageProps {
  params: Promise<{ id: string }>
}
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)

export default function ClaimPage({ params }: ClaimPageProps) {
  const { id } = use(params)
  const [username, setUsername] = useState('')
  const [existingClaim, setExistingClaim] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkExistingClaim = async () => {
      // check if this user has already claimed a username
      const { data: existingClaim, error: existingClaimError } = await supabase.from('waitlist').select('*').eq('claim_id', id).single()
      setExistingClaim(existingClaim)
      if (!existingClaim) {
        router.push('/')
        return
      }
      if (existingClaim.claimed_username) {
        toast.error('You have already claimed a username!')
        return
      }
    }
    checkExistingClaim()
  }, [id, router])
  const handleClaim = async () => {
    // check if claim_id is valid
    const { data: existingClaim, error: existingClaimError } = await supabase.from('waitlist').select('*').eq('claim_id', id).single()
    if (!existingClaim) {
      toast.error('You are not on the waitlist or a username has already been claimed!')
      return
    }

    if (existingClaim.claimed_username) {
      toast.error('You have already claimed a username!')
      return
    }
    // check if username is already claimed
    const { data: existingUser, error: existingUserError } = await supabase.from('waitlist').select('*').eq('claimed_username', username).single()

    if (existingUser) {
      toast.error('This username is already claimed')
      return
    }

    // update waitlist row where claim_id = id with claimed_username = username
    const { data, error } = await supabase.from('waitlist').update({
      claimed_username: username,
    }).eq('claim_id', id).select()

    if (error) {
      console.error(error)
      toast.error('An error has occurred. Please try again.')
      return
    }
    setUsername('')
    toast.success(`You've claimed ${username}!`)
  }

  if (existingClaim && existingClaim.claimed_username) {
    return (

      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100">
        <h1 className="text-3xl font-bold mb-4 font-horizons text-center">Thanks for supporting Stuff!</h1>
        <p className="text-lg mb-8 font-inter">We'll let you know when the product is ready.</p>

      </div>
    )
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 font-horizons">Thanks for supporting Stuff!</h1>
        <p className="text-lg mb-8 font-inter">We'll let you know when the product is ready.</p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Choose your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 text-md font-inter rounded-[24px] border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 dark:focus:ring-stone-700"
          />
          <button
            className="w-full py-4 bg-stone-100 dark:bg-stone-800 text-sm font-inter font-light rounded-[16px] text-stone-900 dark:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleClaim}
          >
            Claim Username
          </button>
        </div>
      </div>
    </div>
  )
} 