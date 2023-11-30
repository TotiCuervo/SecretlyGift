import { SendGridClient } from '../_shared/SendGridClient.ts'

console.log('Hello from Functions!')

const handler = async (_request: Request): Promise<Response> => {
    const sendGridClient = new SendGridClient()
    const res = await sendGridClient.sendEmail({
        type: 'Invite User To Event',
        to: ['cuervor14@gmail.com'],
        subject: 'You have been invited to an event!'
    })
    // Check if the request was successful
    if (res.ok) {
        return new Response('Email sent successfully', {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } else {
        const errorData = await res.text() // Using .text() in case the response is not JSON-formatted
        return new Response(errorData, {
            status: res.status, // Reflect the actual status code from SendGrid
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    return new Response('Email sent successfully', {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// Start the server
Deno.serve(handler)
