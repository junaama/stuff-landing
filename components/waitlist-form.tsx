"use client"

import type React from "react"
import type { Value as E164Number } from 'react-phone-number-input'

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { createClient } from '@supabase/supabase-js'
import PhoneInput from 'react-phone-number-input/input'
import { v4 as uuidv4 } from 'uuid'
import { toast } from "sonner"
// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)

// Basic email validation
function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function WaitlistForm() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "" as E164Number,
    consent: false,
  })
  const [phone, setPhone] = useState<E164Number>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, consent: checked }))
  }

  const checkExistingUser = async (email: string, phoneNumber: E164Number) => {
    const { data: emailData, error: emailError } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email)
      .single()

    if (emailError && emailError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error checking email:', emailError)
      return true // Return true to prevent submission on error
    }

    if (emailData) {
      toast.error("This email address is already on the waitlist.")
      return true
    }

    const { data: phoneData, error: phoneError } = await supabase
      .from('waitlist')
      .select('id')
      .eq('phone_number', phoneNumber)
      .single()

    if (phoneError && phoneError.code !== 'PGRST116') {
      console.error('Error checking phone:', phoneError)
      return true
    }

    if (phoneData) {
      toast.error("This phone number is already on the waitlist.")
      return true
    }

    return false
  }

const sendEmail = async (email: string, claimId: string, firstName: string) => {
  const response = await fetch('/api/email', {
    method: 'POST',
    body: JSON.stringify({ email, claimId, firstName }),
  })
  return response.json()
}
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate email
    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address")
      setIsSubmitting(false)
      return
    }

    if (!phone) {
      toast.error("Please enter a valid phone number")
      setIsSubmitting(false)
      return
    }

    // Check if user already exists
    const exists = await checkExistingUser(formData.email, phone)
    if (exists) {
      setIsSubmitting(false)
      return
    }

    setFormData((prev) => ({ ...prev, phoneNumber: phone }))
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone_number: phone,
            claim_id: uuidv4()
          },
        ])
        .select('claim_id')

      if (error) {
        console.error('Supabase error:', error)
        if (error.code === '42501') {
          toast.error("We're having trouble adding you to the waitlist. Please try again later or contact support.")
        } else {
          toast.error("We're having trouble adding you to the waitlist. Please try again later")
        }
        return
      }
      // send email to user
      await sendEmail(formData.email, data[0].claim_id, formData.firstName)
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "" as E164Number,
        consent: false,
      })
      setPhone("" as E164Number)
    } catch (error) {
      console.error('Unexpected error:', error)
      toast.error("We're having trouble adding you to the waitlist. Please try again later")
    } finally {
      setIsSubmitting(false)
      toast.success("You've been added to the waitlist!")
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-8">
      <h2 className="text-sm font-inter text-center mb-4 font-light text-stone-900 dark:text-stone-100">Be the first to try the newest marketplace!</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 text-md font-inter rounded-[24px] border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 dark:focus:ring-stone-700"
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 text-md font-inter rounded-[24px] border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 dark:focus:ring-stone-700"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 text-md font-inter rounded-[24px] border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 dark:focus:ring-stone-700"
        />

        <PhoneInput
          country="US"
          value={phone}
          name="phone"
          placeholder="Phone Number"
          required
          className="w-full px-4 py-2 text-md font-inter rounded-[24px] border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 dark:focus:ring-stone-700"
          onChange={setPhone}
        />

        <div className="flex items-start space-x-2 py-2">
          <Checkbox
            id="consent"
            checked={formData.consent}
            onCheckedChange={handleCheckboxChange}
            required
            className="mt-1"
          />
          <Label htmlFor="consent" className="text-sm font-inter font-light text-stone-900 dark:text-stone-100">
            I have read the <Link className="underline text-stone-900 dark:text-stone-100 hover:text-stone-700 dark:hover:text-stone-300" href="/privacy">privacy policy</Link> and authorize use of my personal data to
            send newsletter
          </Label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-stone-100 dark:bg-stone-800 text-sm font-inter font-light rounded-[16px] text-stone-900 dark:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  )
}
