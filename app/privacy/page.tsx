"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-stone-950">
            <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        className="text-stone-900 dark:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800"
                        asChild
                    >
                        <Link href="/">← Back</Link>
                    </Button>
                </div>

                <article className="prose prose-stone dark:prose-invert max-w-none">
                    <h1 className="text-3xl font-bold mb-8 text-stone-900 dark:text-stone-100">Privacy Policy</h1>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-stone-900 dark:text-stone-100">Information We Collect</h2>
                        <p className="text-stone-700 dark:text-stone-300">
                            We collect information that you provide directly to us, including your name, email address, and phone number when you sign up for our waitlist.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-stone-900 dark:text-stone-100">How We Use Your Information</h2>
                        <p className="text-stone-700 dark:text-stone-300">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 text-stone-700 dark:text-stone-300">
                            <li>Communicate with you about our services</li>
                            <li>Send you updates about your waitlist position</li>
                            <li>Improve our services</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-stone-900 dark:text-stone-100">Data Security</h2>
                        <p className="text-stone-700 dark:text-stone-300">
                            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-stone-900 dark:text-stone-100">Contact Us</h2>
                        <p className="text-stone-700 dark:text-stone-300">
                            If you have any questions about this Privacy Policy, please contact us at hello@getstuff.nyc
                        </p>
                    </section>
                </article>
            </div>
        </main>
    )
}