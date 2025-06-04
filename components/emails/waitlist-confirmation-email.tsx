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
                <Container style={{ padding: '24px 0 36px 0', margin: '0 auto' }}>
                    <Section style={{ textAlign: 'center', margin: '32px 0' }}>
                        <Img src="https://getstuff.city/stuffmkrt.png" alt="Stuff Logo" width="400" style={{ margin: '0 auto' }} />
                    </Section>
                    <Text style={{ fontSize: '18px', marginBottom: '20px' }}>
                        Hi {firstName},
                    </Text>

                    <Text style={{ fontSize: '18px' }}>
                        Welcome to the universe that is STUFF: the Marketplace made <span style={{ fontStyle: 'italic' }}>for New York City</span>! As an early supporter, you get first dibs on your username &#58;&#41;
                    </Text>
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
                        We&apos;re two women founders that connected instantly on a greater vision of building a hyperlocal marketplace that is safer, easier, and connects people.
                    </Text>
                    <Section style={{ textAlign: 'center', margin: '32px 0' }}>
                        <Img src="https://getstuff.city/founders.gif" alt="Stuff Logo" width="400" style={{ margin: '0 auto' }} />
                    </Section>
                    <Text style={{ fontSize: '18px' }}>
                        As lovers of secondhand and vintage, we think it&apos;s only right to allow people to find the stuff they want when they want it, without unnecessary shipping fees and ever asking <span className="italic">&quot;Is this still available?&quot;</span> ever again.
                        <br />

                    </Text>
                    <Text style={{ fontSize: '18px' }}>
                        In the meantime, stay connected with us on our journey through <Link href="https://www.tiktok.com/@getstuff.city">TikTok</Link> and <Link href="https://www.instagram.com/getstuff.city">Instagram</Link>.
                    </Text>


                    <Text style={{ fontSize: '18px', marginTop: '32px' }}>
                        With extreme gratitude,
                        <br />
                        Eunice & Naama
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
