import { InvoiceCard } from '@/components/InvoiceCard'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
	return (
		<div className="space-y-4">
			{Array.from({ length: 5 }, (_, idx) => (
				<InvoiceCard
					key={idx}
					header={
						<>
							<Skeleton className="h-3 w-20" />
							<Skeleton className="h-3 w-20" />
						</>
					}
					content={
						<>
							<div className="space-y-2">
								<Skeleton className="h-3 w-32" />
								<Skeleton className="h-6 w-28" />
							</div>

							<Skeleton className="h-10 w-[140px]" />
						</>
					}
				/>
			))}
		</div>
	)
}
