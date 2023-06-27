import { auth } from '@clerk/nextjs'
import { InvoiceCard, InvoiceCardContent, InvoiceCardHeader } from '@/components/InvoiceCard'
import { getInvoices } from '@/db'

export default async function Home() {
	const { userId } = auth()
	const invoices = await getInvoices(userId ?? '')

	return (
		<ul className="space-y-4">
			{invoices.map((invoice) => (
				<li key={invoice.id}>
					<InvoiceCard
						invoice={invoice}
						header={<InvoiceCardHeader />}
						content={<InvoiceCardContent />}
					/>
				</li>
			))}
		</ul>
	)
}
