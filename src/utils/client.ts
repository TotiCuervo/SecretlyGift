import axios from 'axios'

const createClient = () =>
    axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json'
    })

const client = createClient()

export default client
