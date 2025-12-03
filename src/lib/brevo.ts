const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;

export const BREVO_LISTS = {
    NEWSLETTER: Number(import.meta.env.VITE_BREVO_NEWSLETTER_LIST_ID) || 6,
    CART_ABANDONED: Number(import.meta.env.VITE_BREVO_CART_ABANDONED_LIST_ID) || 7,
    CLIENTS: Number(import.meta.env.VITE_BREVO_CLIENTS_LIST_ID) || 8,
    LEADS: Number(import.meta.env.VITE_BREVO_LEADS_LIST_ID) || 9,
    MEETING_REQUESTS: Number(import.meta.env.VITE_BREVO_MEETING_REQUESTS_LIST_ID) || 10,
};

interface SendEmailParams {
    to: { email: string; name?: string }[];
    subject: string;
    htmlContent: string;
    sender?: { email: string; name: string };
}

export const sendEmail = async ({ to, subject, htmlContent, sender }: SendEmailParams) => {
    if (!BREVO_API_KEY) {
        console.warn('Brevo API Key not found. Email sending skipped.');
        return;
    }

    try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                sender: sender || {
                    email: import.meta.env.VITE_BREVO_SENDER_EMAIL || 'noreply@othebaldi.com',
                    name: import.meta.env.VITE_BREVO_SENDER_NAME || 'o THEBALDI'
                },
                to,
                subject,
                htmlContent
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to send email');
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending email via Brevo:', error);
        throw error;
    }
};
