import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface BookingConfirmationEmailProps {
  customerName: string;
  bookingRef: string;
  packageName: string;
  activityDate: string;
  timeSlot: string;
  guestCount: number;
  totalAmount: number;
  hotelName?: string;
  roomNumber?: string;
  hasTransfer: boolean;
  isPrivateTransfer?: boolean;
  addons?: Array<{ name: string; quantity: number; price: number }>;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bananabeachkohhey.com';

export const BookingConfirmationEmail = ({
  customerName = 'John',
  bookingRef = 'BB-00001',
  packageName = 'Beach Day Pass',
  activityDate = 'March 15, 2026',
  timeSlot = '10:00 AM',
  guestCount = 2,
  totalAmount = 5980,
  hotelName = 'Patong Beach Hotel',
  roomNumber = '302',
  hasTransfer = true,
  isPrivateTransfer = false,
  addons = [],
}: BookingConfirmationEmailProps) => {
  const previewText = `Your Banana Beach getaway is confirmed! Booking #${bookingRef}`;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/images/LOGO-NS.png`}
              width="180"
              height="auto"
              alt="Banana Beach"
              style={logo}
            />
          </Section>

          {/* Success Banner */}
          <Section style={successBanner}>
            <div style={checkmarkCircle}>
              <Text style={checkmark}>✓</Text>
            </div>
            <Heading style={successTitle}>Booking Confirmed!</Heading>
            <Text style={successSubtitle}>
              Thank you for choosing Banana Beach, {customerName}!
            </Text>
          </Section>

          {/* Booking Reference */}
          <Section style={refSection}>
            <Text style={refLabel}>BOOKING REFERENCE</Text>
            <Text style={refNumber}>{bookingRef}</Text>
            <Text style={refNote}>Please save this number for your records</Text>
          </Section>

          <Hr style={divider} />

          {/* Booking Details Card */}
          <Section style={detailsCard}>
            <Heading as="h2" style={sectionTitle}>
              Your Booking Details
            </Heading>

            <Row style={detailRow}>
              <Column style={detailIcon}>
                <Text style={iconText}>📦</Text>
              </Column>
              <Column style={detailContent}>
                <Text style={detailLabel}>Package</Text>
                <Text style={detailValue}>{packageName}</Text>
              </Column>
            </Row>

            <Row style={detailRow}>
              <Column style={detailIcon}>
                <Text style={iconText}>📅</Text>
              </Column>
              <Column style={detailContent}>
                <Text style={detailLabel}>Date</Text>
                <Text style={detailValue}>{activityDate}</Text>
              </Column>
            </Row>

            <Row style={detailRow}>
              <Column style={detailIcon}>
                <Text style={iconText}>🕐</Text>
              </Column>
              <Column style={detailContent}>
                <Text style={detailLabel}>Time</Text>
                <Text style={detailValue}>{timeSlot}</Text>
              </Column>
            </Row>

            <Row style={detailRow}>
              <Column style={detailIcon}>
                <Text style={iconText}>👥</Text>
              </Column>
              <Column style={detailContent}>
                <Text style={detailLabel}>Guests</Text>
                <Text style={detailValue}>{guestCount} {guestCount === 1 ? 'person' : 'people'}</Text>
              </Column>
            </Row>

            {hasTransfer && hotelName && (
              <Row style={detailRow}>
                <Column style={detailIcon}>
                  <Text style={iconText}>🚐</Text>
                </Column>
                <Column style={detailContent}>
                  <Text style={detailLabel}>
                    {isPrivateTransfer ? 'Private Transfer' : 'Hotel Pickup'}
                  </Text>
                  <Text style={detailValue}>
                    {hotelName}{roomNumber ? `, Room ${roomNumber}` : ''}
                  </Text>
                </Column>
              </Row>
            )}
          </Section>

          {/* Add-ons if any */}
          {addons && addons.length > 0 && (
            <Section style={addonsSection}>
              <Heading as="h3" style={addonsTitle}>
                Add-ons
              </Heading>
              {addons.map((addon, index) => (
                <Row key={index} style={addonRow}>
                  <Column>
                    <Text style={addonName}>
                      {addon.name} × {addon.quantity}
                    </Text>
                  </Column>
                  <Column style={addonPriceCol}>
                    <Text style={addonPrice}>฿{formatPrice(addon.price * addon.quantity)}</Text>
                  </Column>
                </Row>
              ))}
            </Section>
          )}

          <Hr style={divider} />

          {/* Total Amount */}
          <Section style={totalSection}>
            <Row>
              <Column>
                <Text style={totalLabel}>Total Paid</Text>
              </Column>
              <Column style={totalAmountCol}>
                <Text style={totalAmount_}>฿{formatPrice(totalAmount)}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* What to Bring */}
          <Section style={infoSection}>
            <Heading as="h2" style={sectionTitle}>
              What to Bring
            </Heading>
            <Row style={infoRow}>
              <Column style={infoBullet}>
                <Text style={bulletPoint}>•</Text>
              </Column>
              <Column>
                <Text style={infoText}>Beachwear & sunscreen</Text>
              </Column>
            </Row>
            <Row style={infoRow}>
              <Column style={infoBullet}>
                <Text style={bulletPoint}>•</Text>
              </Column>
              <Column>
                <Text style={infoText}>Sunscreen & hat</Text>
              </Column>
            </Row>
            <Row style={infoRow}>
              <Column style={infoBullet}>
                <Text style={bulletPoint}>•</Text>
              </Column>
              <Column>
                <Text style={infoText}>Camera (optional)</Text>
              </Column>
            </Row>
            <Row style={infoRow}>
              <Column style={infoBullet}>
                <Text style={bulletPoint}>•</Text>
              </Column>
              <Column>
                <Text style={infoText}>This booking confirmation (digital or printed)</Text>
              </Column>
            </Row>
          </Section>

          {/* Important Notes */}
          <Section style={notesSection}>
            <Heading as="h2" style={notesSectionTitle}>
              Important Information
            </Heading>
            <Text style={noteText}>
              ⏰ Please arrive 15 minutes before your scheduled time
            </Text>
            <Text style={noteText}>
              🏖️ Beach access and facilities available on site
            </Text>
            <Text style={noteText}>
              📞 Contact us at least 24 hours in advance for any changes
            </Text>
          </Section>

          {/* CTA Button */}
          <Section style={ctaSection}>
            <Button style={ctaButton} href={`${baseUrl}/booking?ref=${bookingRef}`}>
              View Booking Details
            </Button>
          </Section>

          {/* Contact Information */}
          <Section style={contactSection}>
            <Heading as="h3" style={contactTitle}>
              Need Help?
            </Heading>
            <Text style={contactText}>
              📧 Email: <Link href="mailto:relax@bananabeachkohhey.com" style={contactLink}>relax@bananabeachkohhey.com</Link>
            </Text>
            <Text style={contactText}>
              📞 Phone: <Link href="tel:0814167555" style={contactLink}>081 416 7555</Link>
            </Text>
            <Text style={contactText}>
              💬 LINE: @bananabeach
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Img
              src={`${baseUrl}/images/LOGO-NS.png`}
              width="120"
              height="auto"
              alt="Banana Beach"
              style={footerLogo}
            />
            <Text style={footerText}>
              Koh Hey Island&apos;s Premier Beach Experience
            </Text>
            <Row style={socialRow}>
              <Column style={socialCol}>
                <Link href="https://www.facebook.com/bananabeachkohhey" style={socialLink}>
                  Facebook
                </Link>
              </Column>
              <Column style={socialCol}>
                <Link href="https://www.instagram.com/bananabeachkohhey" style={socialLink}>
                  Instagram
                </Link>
              </Column>
              <Column style={socialCol}>
                <Link href="https://www.tripadvisor.com" style={socialLink}>
                  TripAdvisor
                </Link>
              </Column>
            </Row>
            <Text style={footerAddress}>
              44/1 Moo 5, Viset Road, Rawai, Muang, Phuket 83130, Thailand
            </Text>
            <Text style={footerCopyright}>
              © 2026 The Coral Reef Cabana Co., Ltd. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default BookingConfirmationEmail;

// Styles
const main: React.CSSProperties = {
  backgroundColor: '#f4f4f5',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container: React.CSSProperties = {
  margin: '0 auto',
  padding: '20px 0',
  maxWidth: '600px',
};

const header: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  padding: '30px 40px',
  textAlign: 'center' as const,
  borderRadius: '16px 16px 0 0',
};

const logo: React.CSSProperties = {
  margin: '0 auto',
};

const successBanner: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  padding: '20px 40px 40px',
  textAlign: 'center' as const,
};

const checkmarkCircle: React.CSSProperties = {
  width: '80px',
  height: '80px',
  backgroundColor: '#22c55e',
  borderRadius: '50%',
  margin: '0 auto 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const checkmark: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '40px',
  fontWeight: 'bold',
  lineHeight: '80px',
  margin: 0,
  textAlign: 'center' as const,
};

const successTitle: React.CSSProperties = {
  color: '#00c5ba',
  fontSize: '32px',
  fontWeight: '700',
  margin: '0 0 10px',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
};

const successSubtitle: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '16px',
  margin: 0,
};

const refSection: React.CSSProperties = {
  backgroundColor: '#0f0f0f',
  padding: '25px 40px',
  textAlign: 'center' as const,
};

const refLabel: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '12px',
  fontWeight: '600',
  letterSpacing: '2px',
  margin: '0 0 8px',
  textTransform: 'uppercase' as const,
};

const refNumber: React.CSSProperties = {
  color: '#00c5ba',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 8px',
  letterSpacing: '2px',
};

const refNote: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '12px',
  margin: 0,
};

const divider: React.CSSProperties = {
  borderColor: '#e4e4e7',
  margin: 0,
};

const detailsCard: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '30px 40px',
};

const sectionTitle: React.CSSProperties = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: '700',
  margin: '0 0 20px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const detailRow: React.CSSProperties = {
  marginBottom: '16px',
};

const detailIcon: React.CSSProperties = {
  width: '40px',
  verticalAlign: 'top',
};

const iconText: React.CSSProperties = {
  fontSize: '20px',
  margin: 0,
};

const detailContent: React.CSSProperties = {
  verticalAlign: 'top',
};

const detailLabel: React.CSSProperties = {
  color: '#71717a',
  fontSize: '12px',
  fontWeight: '500',
  margin: '0 0 2px',
  textTransform: 'uppercase' as const,
};

const detailValue: React.CSSProperties = {
  color: '#18181b',
  fontSize: '16px',
  fontWeight: '600',
  margin: 0,
};

const addonsSection: React.CSSProperties = {
  backgroundColor: '#f9fafb',
  padding: '20px 40px',
};

const addonsTitle: React.CSSProperties = {
  color: '#1a1a1a',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 12px',
  textTransform: 'uppercase' as const,
};

const addonRow: React.CSSProperties = {
  marginBottom: '8px',
};

const addonName: React.CSSProperties = {
  color: '#52525b',
  fontSize: '14px',
  margin: 0,
};

const addonPriceCol: React.CSSProperties = {
  textAlign: 'right' as const,
};

const addonPrice: React.CSSProperties = {
  color: '#18181b',
  fontSize: '14px',
  fontWeight: '600',
  margin: 0,
};

const totalSection: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '20px 40px',
};

const totalLabel: React.CSSProperties = {
  color: '#52525b',
  fontSize: '16px',
  fontWeight: '500',
  margin: 0,
};

const totalAmountCol: React.CSSProperties = {
  textAlign: 'right' as const,
};

const totalAmount_: React.CSSProperties = {
  color: '#1a1a1a',
  fontSize: '28px',
  fontWeight: '700',
  margin: 0,
};

const infoSection: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '30px 40px',
};

const infoRow: React.CSSProperties = {
  marginBottom: '8px',
};

const infoBullet: React.CSSProperties = {
  width: '20px',
  verticalAlign: 'top',
};

const bulletPoint: React.CSSProperties = {
  color: '#00c5ba',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: 0,
};

const infoText: React.CSSProperties = {
  color: '#52525b',
  fontSize: '14px',
  margin: 0,
  lineHeight: '1.5',
};

const notesSection: React.CSSProperties = {
  backgroundColor: '#fef9c3',
  padding: '25px 40px',
  borderLeft: '4px solid #00c5ba',
};

const notesSectionTitle: React.CSSProperties = {
  color: '#713f12',
  fontSize: '16px',
  fontWeight: '700',
  margin: '0 0 15px',
  textTransform: 'uppercase' as const,
};

const noteText: React.CSSProperties = {
  color: '#78350f',
  fontSize: '14px',
  margin: '0 0 8px',
  lineHeight: '1.5',
};

const ctaSection: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '30px 40px',
  textAlign: 'center' as const,
};

const ctaButton: React.CSSProperties = {
  backgroundColor: '#00c5ba',
  borderRadius: '12px',
  color: '#000000',
  fontSize: '16px',
  fontWeight: '700',
  padding: '16px 32px',
  textDecoration: 'none',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
};

const contactSection: React.CSSProperties = {
  backgroundColor: '#f4f4f5',
  padding: '30px 40px',
  textAlign: 'center' as const,
};

const contactTitle: React.CSSProperties = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 15px',
};

const contactText: React.CSSProperties = {
  color: '#52525b',
  fontSize: '14px',
  margin: '0 0 8px',
};

const contactLink: React.CSSProperties = {
  color: '#1a1a1a',
  textDecoration: 'none',
};

const footer: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  padding: '40px',
  textAlign: 'center' as const,
  borderRadius: '0 0 16px 16px',
};

const footerLogo: React.CSSProperties = {
  margin: '0 auto 15px',
};

const footerText: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '14px',
  margin: '0 0 20px',
};

const socialRow: React.CSSProperties = {
  marginBottom: '20px',
};

const socialCol: React.CSSProperties = {
  textAlign: 'center' as const,
};

const socialLink: React.CSSProperties = {
  color: '#00c5ba',
  fontSize: '14px',
  textDecoration: 'none',
  padding: '0 15px',
};

const footerAddress: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '12px',
  margin: '0 0 10px',
  lineHeight: '1.5',
};

const footerCopyright: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.4)',
  fontSize: '11px',
  margin: 0,
};
