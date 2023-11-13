export default function Header({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <>
            <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
            <p className="text-lg text-gray-600">{subtitle}</p>
        </>
    )
}
