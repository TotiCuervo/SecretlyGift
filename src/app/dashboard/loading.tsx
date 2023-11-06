import CreateExchangeCard from './_components/CreateExchangeCard'
import LoadingBlock from '@/components/loading/loading-block'

export default async function loading() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[...Array(2)].map((_, index) => (
                <div className="h-60">
                    <LoadingBlock key={index} />
                </div>
            ))}
            <CreateExchangeCard />
        </div>
    )
}
