import CreateExchangeCard from './_components/CreateExchangeCard'
import ExchangeDetailCard from './_components/ExchangeDetailCard'

export default function DashboardPage() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
            <ExchangeDetailCard />
            <ExchangeDetailCard />
            <ExchangeDetailCard />
            <ExchangeDetailCard />
            <ExchangeDetailCard />
            <CreateExchangeCard />
        </div>
    )
}
