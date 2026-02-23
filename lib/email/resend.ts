import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase/server';

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not configured');
    }
    _resend = new Resend(apiKey);
  }
  return _resend;
}

// For backward compatibility - will throw at runtime if API key is missing
export const resend = {
  emails: {
    send: async (...args: Parameters<Resend['emails']['send']>) => {
      return getResend().emails.send(...args);
    }
  }
};

export const EMAIL_FROM = 'Banana Beach <relax@bananabeachkohhey.com>';

// Parse comma-separated emails into array
export function parseEmails(emailString: string): string[] {
  return emailString
    .split(',')
    .map(email => email.trim())
    .filter(email => email.length > 0 && email.includes('@'));
}

// Get notification settings from database
export async function getNotificationSettings() {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('value')
      .eq('key', 'notifications')
      .single();

    if (error || !data) {
      return {
        emailNotifications: true,
        bookingNotificationEmails: 'relax@bananabeachkohhey.com',
        contactNotificationEmails: 'relax@bananabeachkohhey.com',
        sendCustomerConfirmation: true,
      };
    }

    return data.value as {
      emailNotifications: boolean;
      bookingNotificationEmails: string;
      contactNotificationEmails: string;
      sendCustomerConfirmation: boolean;
    };
  } catch {
    return {
      emailNotifications: true,
        bookingNotificationEmails: 'relax@bananabeachkohhey.com',
        contactNotificationEmails: 'relax@bananabeachkohhey.com',
      sendCustomerConfirmation: true,
    };
  }
}
