import { InvoiceStatus } from '@/components/InvoiceStatus'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { deleteInvoice, getInvoiceFromId, markInvoiceAsPaid } from '@/db'
import { getShortenedInvoiceId } from '@/lib/utils'

export default async function InvoiceDetailPage({ params }: { params: { id: string } }) {
	const invoice = await getInvoiceFromId(params.id)
	const disabled = invoice.status === 'paid'

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
							<Button disabled={disabled} variant="secondary">
								Edit
							</Button>
							<Button
								disabled={disabled}
								variant="destructive"
								onClick={() => deleteInvoice(invoice.id)}
							>
								Delete
							</Button>
							<Button disabled={disabled} onClick={() => markInvoiceAsPaid(invoice.id)}>
								Mark as Paid
							</Button>
						</div>
					</CardContent>
				</Card>
			</section>
			<section>{getShortenedInvoiceId(invoice.id)}</section>
		</div>
	)
}
