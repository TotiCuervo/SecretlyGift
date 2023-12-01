export default function getDateString(dateString: string) {
    const [year, month, day] = dateString.split('-').map((num) => parseInt(num, 10))
    const date = new Date(year, month - 1, day) // month is 0-indexed in JS Date
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
