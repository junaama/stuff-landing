// emails/WaitlistConfirmationEmail.tsx
import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Text,
    Button,
    Section,
    Img,
    Link
} from '@react-email/components';

type WaitlistEmailProps = {
    firstName: string;
    claimId: string;
};

export default function WaitlistConfirmationEmail({
    firstName,
    claimId,
}: WaitlistEmailProps) {
    const claimUrl = `https://getstuff.city/claim/${claimId}`;

    return (
        <Html>
            <Head />
            <Preview>You're on the Stuff waitlist 🎉</Preview>
            <Body style={{ fontFamily: 'Newsreader, serif', backgroundColor: '#ffffff', textAlign: 'center' }}>
                <Container style={{ padding: '24px 0 36px 0', margin:'0 auto' }}>
                    <Section style={{ textAlign: 'center', margin: '32px 0' }}>
                        <Img src="https://getstuff.city/stuffmkrt.png" alt="Stuff Logo" width="400" style={{ margin: '0 auto' }} />
                    </Section>
                    <Text style={{ fontSize: '18px', marginBottom: '20px' }}>
                        Hi {firstName},
                    </Text>

                    <Text style={{ fontSize: '18px' }}>
                        Thank you for your interest in Stuff: The Marketplace made <span style={{ fontStyle: 'italic' }}>for New York City</span>! We&apos;re excited to confirm your spot on the waitlist.
                    </Text>
                    <Text style={{ fontSize: '18px' }}>Be the first to claim your username!</Text>
                    <Section style={{ textAlign: 'center', margin: '32px 0' }}>
                        <Button
                            href={claimUrl}
                            style={{
                                backgroundColor: '#000000',
                                color: '#ffffff',
                                padding: '12px 24px',
                                fontSize: '18px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                            }}
                        >
                            Claim your username
                        </Button>
                    </Section>

                    <Text style={{ fontSize: '18px' }}>
                        Our team is grinding hard to be the better online marketplace for offline transactions.
                        We can&apos;t wait to share it with you soon.
                        <br />
                    </Text>
                    <Text style={{ fontSize: '18px' }}>
                        In the meantime, stay tuned on <Link href="https://www.tiktok.com/@getstuff.city">TikTok</Link> & <Link href="https://www.instagram.com/getstuff.city">Instagram</Link> for updates and to follow our founder journey.
                    </Text>

                    <Text style={{ fontSize: '18px' }}>
                        The future of urban marketplaces is closer than you think.
                    </Text>

                    <Text style={{ fontSize: '18px', marginTop: '32px' }}>
                        Cheers,
                        <br />
                        Co-founders Eunice & Naama
                    </Text>
                    <Link href="https://getstuff.city" style={{ fontSize: '18px' }}>getstuff.city</Link>
                    <Section style={{ textAlign: 'center', margin: '32px 0', fontSize: '12px' }}>
                        <Button href={`https://getstuff.city/unsubscribe?cid=${claimId}`}>Unsubscribe</Button>

                    </Section>
                </Container>
            </Body>
        </Html>
    );
}
