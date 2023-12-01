import { corsHeaders } from './cors.ts'
interface SendEmailProps {
    type: EmailTemplateTypes
    to: string[]
    subject: string
    templateData?: Object
}

export type EmailTemplateTypes = 'Invite User To Event' | 'Magic Link'

export interface EmailTemplate {
    type: EmailTemplateTypes
    templateId: string
}
const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')

export class SendGridClient {
    private templates: Record<EmailTemplateTypes, string>

    constructor() {
        this.templates = {
            'Invite User To Event': 'd-d28d05ee3e034e47921f4978c8231f00',
            'Magic Link': 'd-4f1e5a9c2b8d4f3a9e2e0c1e6c1b5a6a'
        }
    }

    async sendEmail({ type, to, subject, templateData = {} }: SendEmailProps) {
        const payload = {
            personalizations: [
                {
                    to: to.map((email) => ({ email })),
                    dynamic_template_data: templateData
                }
            ],
            from: { email: 'secretlygift@gmail.com' },
            subject: subject,
            template_id: this.templates[type]
        }

        const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${SENDGRID_API_KEY}`,
                ...corsHeaders
            },
            body: JSON.stringify(payload)
        })

        return res
    }

    async handleResponse(res: Response) {
        if (res.ok) {
            return new Response('Email sent successfully', {
                status: 200,
                headers: {
                    ...corsHeaders,
                    'Content-Type': 'application/json'
                }
            })
        } else {
            const errorData = await res.text() // Using .text() in case the response is not JSON-formatted
            return new Response(errorData, {
                status: res.status, // Reflect the actual status code from SendGrid
                headers: {
                    ...corsHeaders,
                    'Content-Type': 'application/json'
                }
            })
        }
    }
}
