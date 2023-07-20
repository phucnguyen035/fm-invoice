import { InvoiceStatus } from '@/components/InvoiceStatus'
import { Card, CardContent } from '@/components/ui/card'
import { getInvoiceFromId } from '@/db'
import { getShortenedInvoiceId } from '@/lib/utils'
import InvoiceActions from './InvoiceActions'

export default async function InvoiceDetailPage({ params }: { params: { id: string } }) {
	const invoice = await getInvoiceFromId(params.id)

	return (
		<div className="space-y-4">
			<section>
				<Card className="border-none shadow-none">
					<CardContent className="flex w-full items-center justify-between p-6">
						<div className="flex w-full items-center justify-between space-x-4 md:w-auto">
							<span>Status</span>
							<InvoiceStatus status={invoice.status} />
						</div>

						<div className="fixed inset-x-0 bottom-0 h-[90px] space-x-2 bg-popover py-[22px] text-center md:relative md:h-auto md:bg-transparent md:py-0 md:text-left">
							<InvoiceActions id={invoice.id} disabled={invoice.status === 'paid'} />
						</div>
					</CardContent>
				</Card>
			</section>
			<section>{getShortenedInvoiceId(invoice.id)}</section>
		</div>
	)
}
