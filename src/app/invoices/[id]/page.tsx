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
			<section>
				<Card className="border-none shadow-none">
					<CardContent className="space-y-8 py-6">
						<section>
							<h3>#{getShortenedInvoiceId(invoice.id)}</h3>
							{invoice.description && <div>{invoice.description}</div>}
						</section>

						<section>
							<h3 className="sr-only">Address</h3>
							<div>{invoice.updatedAt.toLocaleDateString()}</div>
							<div>{invoice.addressFrom.street}</div>
							<div>{invoice.addressFrom.city}</div>
							<div>{invoice.addressFrom.postCode}</div>
							<div>{invoice.addressFrom.country}</div>
						</section>

						<section className="flex justify-between">
							<h3 className="sr-only">Payment info</h3>
						</section>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
