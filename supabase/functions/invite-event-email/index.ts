import { SendGridClient } from '../_shared/SendGridClient.ts'
import { publicEventRoute } from '../_shared/routes/public-event-route.ts'

const NEXT_PUBLIC_URL = Deno.env.get('NEXT_PUBLIC_URL')

const handler = async (request: Request): Promise<Response> => {
    const { to, name, invited_by, event_uuid, event_name, event_date } = await request.json()
    const sendGridClient = new SendGridClient()
    const res = await sendGridClient.sendEmail({
        type: 'Invite User To Event',
        to: [to],
        subject: 'You have been invited to an event!',
        templateData: {
            name,
            invited_by,
            button_url: `${NEXT_PUBLIC_URL}${publicEventRoute(event_uuid)}`,
            event_name,
            event_date
        }
    })

    return await sendGridClient.handleResponse(res)
}

// Start the server
Deno.serve(handler)
