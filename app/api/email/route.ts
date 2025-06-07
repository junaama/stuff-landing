import { Resend } from 'resend';

import WaitlistConfirmationEmail from '@/components/emails/waitlist-confirmation-email';

const resend = new Resend(process.env.RESEND_KEY);

export async function POST(request: Request) {
    const { email, claimId, firstName } = await request.json();
    try {
        const { data, error } = await resend.emails.send({
            from: 'STUFF <hello@getstuff.city>',
            to: email,
            subject: "You're on the list!",
            react: WaitlistConfirmationEmail({ firstName, claimId }),
            text: `Hi ${firstName},\n\nWelcome to the universe that is STUFF: the Marketplace made for New York City! As an early supporter, you get first dibs on your username ;)\n\nClaim your username: https://getstuff.city/claim/${claimId}\n\nWe're two women founders that connected instantly on a greater vision of building a hyperlocal marketplace that is safer, easier, and connects people.\n\nAs lovers of secondhand and vintage, we think it's only right to allow people to find the stuff they want when they want it, without unnecessary shipping fees and ever asking "Is this still available?" ever again.\n\nIn the meantime, stay connected with us on our journey through TikTok (https://www.tiktok.com/@getstuff.city) and Instagram (https://www.instagram.com/getstuff.city).\n\nWith extreme gratitude,\nEunice & Naama\ngetstuff.city\n\nUnsubscribe: https://getstuff.city/unsubscribe?cid=${claimId}`,
            headers: {
                'List-Unsubscribe': '<https://getstuff.com/unsubscribe>',
            },

        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }
        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}