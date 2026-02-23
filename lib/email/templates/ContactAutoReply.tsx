import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactAutoReplyProps {
  name: string;
  subject: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bananabeachkohhey.com';

export const ContactAutoReply = ({
  name,
  subject,
}: ContactAutoReplyProps) => {
  const previewText = `Thank you for contacting Banana Beach`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/images/logo-white.png`}
              width="180"
              height="auto"
              alt="Banana Beach"
              style={logo}
            />
          </Section>

          {/* Thank You Banner */}
          <Section style={thankYouBanner}>
            <Text style={thankYouIcon}>✉️</Text>
            <Heading style={thankYouTitle}>Message Received!</Heading>
            <Text style={thankYouText}>
              Thank you for reaching out to us
            </Text>
          </Section>

          {/* Content */}
          <Section style={contentSection}>
            <Text style={greeting}>Dear {name},</Text>
            
            <Text style={paragraph}>
              Thank you for contacting Banana Beach. We have received your message 
              regarding <strong>"{subject}"</strong> and our team will get back to you as soon as possible.
            </Text>
            
            <Text style={paragraph}>
              We typically respond within 24-48 hours during business days. If your inquiry 
              is urgent, please don't hesitate to call us directly.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Contact Info */}
          <Section style={contactSection}>
            <Heading as="h2" style={sectionTitle}>
              Need Immediate Assistance?
            </Heading>
            
            <table style={contactTable}>
              <tbody>
                <tr>
                  <td style={contactIcon}>📞</td>
                  <td style={contactInfo}>
                    <Text style={contactLabel}>Phone</Text>
                    <Link href="tel:0814167555" style={contactLink}>081 416 7555</Link>
                  </td>
                </tr>
                <tr>
                  <td style={contactIcon}>📧</td>
                  <td style={contactInfo}>
                    <Text style={contactLabel}>Email</Text>
                    <Link href="mailto:relax@bananabeachkohhey.com" style={contactLink}>
                      relax@bananabeachkohhey.com
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={contactIcon}>⏰</td>
                  <td style={contactInfo}>
                    <Text style={contactLabel}>Operating Hours</Text>
                    <Text style={contactValue}>Daily 8:00 AM - 5:00 PM (GMT+7)</Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Hr style={divider} />

          {/* CTA */}
          <Section style={ctaSection}>
            <Text style={ctaText}>
              While you wait, why not explore our beach packages?
            </Text>
            <Button style={ctaButton} href={`${baseUrl}/booking`}>
              Book Your Beach Day
            </Button>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Banana Beach - Koh Hey Island&apos;s Premier Beach Experience
            </Text>
            <Text style={footerAddress}>
              44/1 Moo 5, Viset Road, Rawai, Muang, Phuket 83130, Thailand
            </Text>
            <Hr style={footerDivider} />
            <Text style={footerLinks}>
              <Link href={baseUrl} style={footerLink}>Website</Link>
              {' • '}
              <Link href="https://facebook.com/bananabeachkohhey" style={footerLink}>Facebook</Link>
              {' • '}
              <Link href="https://instagram.com/bananabeachkohhey" style={footerLink}>Instagram</Link>
            </Text>
            <Text style={copyright}>
              © {new Date().getFullYear()} The Coral Reef Cabana Co., Ltd. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactAutoReply;

// Styles
const main = {
  backgroundColor: '#f4f4f5',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#10073c',
  padding: '30px 40px',
  borderRadius: '12px 12px 0 0',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const thankYouBanner = {
  backgroundColor: '#0a0528',
  padding: '30px 40px',
  textAlign: 'center' as const,
};

const thankYouIcon = {
  fontSize: '48px',
  margin: '0 0 10px 0',
};

const thankYouTitle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 10px 0',
};

const thankYouText = {
  color: '#94a3b8',
  fontSize: '16px',
  margin: '0',
};

const contentSection = {
  backgroundColor: '#ffffff',
  padding: '30px 40px',
};

const greeting = {
  color: '#1e293b',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 20px 0',
};

const paragraph = {
  color: '#475569',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0 0 15px 0',
};

const divider = {
  borderColor: '#e2e8f0',
  margin: '0',
};

const contactSection = {
  backgroundColor: '#ffffff',
  padding: '30px 40px',
};

const sectionTitle = {
  color: '#10073c',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 20px 0',
};

const contactTable = {
  width: '100%',
};

const contactIcon = {
  fontSize: '24px',
  padding: '10px 15px 10px 0',
  verticalAlign: 'top' as const,
  width: '40px',
};

const contactInfo = {
  padding: '10px 0',
  verticalAlign: 'top' as const,
};

const contactLabel = {
  color: '#64748b',
  fontSize: '12px',
  fontWeight: '500',
  margin: '0',
  textTransform: 'uppercase' as const,
};

const contactLink = {
  color: '#10073c',
  fontSize: '14px',
  textDecoration: 'none',
};

const contactValue = {
  color: '#1e293b',
  fontSize: '14px',
  margin: '0',
};

const ctaSection = {
  backgroundColor: '#f8fafc',
  padding: '30px 40px',
  textAlign: 'center' as const,
};

const ctaText = {
  color: '#475569',
  fontSize: '14px',
  margin: '0 0 20px 0',
};

const ctaButton = {
  backgroundColor: '#00c5ba',
  borderRadius: '8px',
  color: '#10073c',
  fontSize: '14px',
  fontWeight: '600',
  padding: '12px 30px',
  textDecoration: 'none',
};

const footer = {
  backgroundColor: '#1e293b',
  padding: '30px 40px',
  borderRadius: '0 0 12px 12px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 5px 0',
};

const footerAddress = {
  color: '#94a3b8',
  fontSize: '12px',
  margin: '0 0 15px 0',
};

const footerDivider = {
  borderColor: '#374151',
  margin: '15px 0',
};

const footerLinks = {
  color: '#94a3b8',
  fontSize: '12px',
  margin: '0 0 10px 0',
};

const footerLink = {
  color: '#94a3b8',
  textDecoration: 'none',
};

const copyright = {
  color: '#64748b',
  fontSize: '11px',
  margin: '0',
};
