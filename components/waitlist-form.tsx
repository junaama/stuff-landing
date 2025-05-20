"use client"

import type React from "react"
import type { Value as E164Number } from 'react-phone-number-input'

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { createClient } from '@supabase/supabase-js'
import { useToast } from "@/components/ui/use-toast"
import PhoneInput from 'react-phone-number-input/input'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)

// Basic email validation
function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function WaitlistForm() {
  const { toast } = useToast()
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

  // const handlePhoneChange = (value: E164Number | undefined) => {
  //   setFormData((prev) => ({ ...prev, phone: value || "" }))
  // }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, consent: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate email
    if (!isValidEmail(formData.email)) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address",
      })
      setIsSubmitting(false)
      return
    }
    console.log('formdata', formData, phone)

    if (!phone) {
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
            phone_number: formData.phoneNumber
          },
        ])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        if (error.code === '42501') {
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "We're having trouble adding you to the waitlist. Please try again later or contact support.",
          })
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "We're having trouble adding you to the waitlist. Please try again later",
          })
        }
        return
      }

      toast({
        title: "Success!",
        description: `You've been added to the waitlist. Your position is ${data[0].id}`,
      })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "" as E164Number,
        consent: false,
      })
    } catch (error) {
      console.error('Unexpected error:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "We're having trouble adding you to the waitlist. Please try again later",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-8">
      <h2 className="text-sm font-inter text-center mb-4 font-light text-stone-900 dark:text-stone-100">Join the waitlist</h2>

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
