import { InvoiceCard } from '@/components/InvoiceCard'
import PageSection from './PageSection'

export default function Loading() {
	return (
		<PageSection disabled>
			{Array.from({ length: 5 }, (_, idx) => (
				<InvoiceCard key={idx} loading />
			))}
		</PageSection>
	)
}
