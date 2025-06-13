// import {
//     Html,
//     Head,
//     Preview,
//     Body,
//     Container,
//     Text,
//     Button,
//     Section,
//     Img,
//     Link
// } from '@react-email/components';

// type AdminBroadcastEmailProps = {
//     customText: string;
//     buttonLink: string;
//     buttonText: string;
//     imageUrl?: string; // Optional image
//     previewText: string;
//     subject: string;
// };

// export default function AdminBroadcastEmail({
//     customText,
//     buttonLink,
//     buttonText,
//     imageUrl,
//     previewText,
//     subject
// }: AdminBroadcastEmailProps) {
//     return (
//         <Html>
//             <Head>
//                 <title>{subject}</title>
//             </Head>
//             <Preview>{previewText}</Preview>
//             <Body style={{ fontFamily: 'Newsreader, serif', textAlign: 'center' }}>
//                 <Container style={{ padding: '24px 0 36px 0', margin: '0 auto' }}>
//                     <Section style={{ textAlign: 'center', margin: '32px 0' }}>
//                         <Img src={imageUrl || "https://getstuff.city/stuffmkrt.png"} alt="Stuff Logo" width="400" style={{ margin: '0 auto' }} />
//                     </Section>

//                     <Text style={{ fontSize: '18px', whiteSpace: 'pre-wrap' }}>
//                         {customText}
//                     </Text>

//                     <Section style={{ textAlign: 'center', margin: '32px 0' }}>
//                         <Button
//                             href={buttonLink}
//                             style={{
//                                 backgroundColor: '#000000',
//                                 color: '#ffffff',
//                                 padding: '12px 24px',
//                                 fontSize: '18px',
//                                 borderRadius: '6px',
//                                 textDecoration: 'none',
//                             }}
//                         >
//                             {buttonText}
//                         </Button>
//                     </Section>

//                     <Text style={{ fontSize: '18px', marginTop: '32px' }}>
//                         All our best,
//                         <br />
//                         Eunice & Naama
//                     </Text>
//                     <Link href="https://getstuff.city" style={{ fontSize: '18px' }}>getstuff.city</Link>
//                 </Container>
//             </Body>
//         </Html>
//     );
// }

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

// This type now matches the structure we send from the API
type ProcessedComponent = {
    type: 'text' | 'button' | 'image' | 'link';
    content: string;
    link?: string;
};

type AdminBroadcastEmailProps = {
    subject: string;
    previewText: string;
    imageUrl?: string;
    // It receives the processed components array for a single user
    processedComponents: ProcessedComponent[];
};

export default function AdminBroadcastEmail({
    subject,
    previewText,
    imageUrl,
    processedComponents = [],
}: AdminBroadcastEmailProps) {
    return (
        <Html>
            <Head>
                <title>{subject}</title>
            </Head>
            <Preview>{previewText}</Preview>
            <Body style={{ fontFamily: 'Newsreader, serif', textAlign: 'center', }}>
                <Container style={{ padding: '24px 0 36px 0', margin: '0 auto',  }}>
                    {imageUrl ? (
                        <Section style={{ textAlign: 'center', margin: '32px 0' }}>
                            <Img src={imageUrl} alt="Header" width="400" style={{ margin: '0 auto' }} />
                        </Section>
                    ) : <Section style={{ textAlign: 'center', margin: '32px 0' }}>
                        <Img src="https://getstuff.city/stuffmkrt.png" alt="Stuff Logo" width="400" style={{ margin: '0 auto' }} />
                    </Section>}

                    {/* Dynamically render components */}
                    {processedComponents.map((comp, index) => {
                        switch (comp.type) {
                            case 'text':
                                return (
                                    <Text key={index} style={{ fontSize: '18px', whiteSpace: 'pre-wrap', padding: '0 20px' }}>
                                        {comp.content}
                                    </Text>
                                );
                            case 'button':
                                return (
                                    <Section key={index} style={{ textAlign: 'center', margin: '20px 0' }}>
                                        <Button
                                            href={comp.link}
                                            style={{
                                                backgroundColor: '#000000',
                                                color: '#ffffff',
                                                padding: '12px 24px',
                                                fontSize: '18px',
                                                borderRadius: '6px',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            {comp.content}
                                        </Button>
                                    </Section>
                                );
                            case 'image':
                                return (
                                    <Section key={index} style={{ textAlign: 'center', margin: '32px 0' }}>
                                    <Img src="https://getstuff.city/founders.gif" alt="Stuff Logo" width="400" style={{ margin: '0 auto' }} />
                                </Section>
                                )
                            case 'link':
                                return (
                                    <Link href={comp.link} style={{ fontSize: '18px' }}>{comp.link}</Link>
                                )
                            default:
                                return null;
                        }
                    })}

                    <Text style={{ fontSize: '18px', marginTop: '32px' }}>
                        All our best,
                        <br />
                        Eunice & Naama
                    </Text>
                    <Link href="https://getstuff.city" style={{ fontSize: '18px' }}>getstuff.city</Link>
                </Container>
            </Body>
        </Html>
    );
}