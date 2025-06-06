import { Resend } from 'resend';

import WaitlistConfirmationEmail from '@/components/emails/waitlist-confirmation-email';

const resend = new Resend(process.env.RESEND_KEY);

export async function POST(request: Request) {
    const { email, claimId, firstName } = await request.json();

    resend.emails.send({
        from: 'STUFF <hello@getstuff.city>',
        to: email,
        subject: "You're on the list!",
        react: WaitlistConfirmationEmail({ firstName, claimId }),
        headers: {
            'List-Unsubscribe': '<https://getstuff.com/unsubscribe>',
        },
    });
    return Response.json({ message: 'Email sent' });
}