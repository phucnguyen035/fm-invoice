'use client'

import { Button } from '@/components/ui/button'
import { deleteInvoice, markInvoiceAsPaid } from '@/db'

type Props = {
	id: string
	disabled: boolean
}

export default function InvoiceActions({ id, disabled }: Props) {
	return (
		<>
			<Button disabled={disabled} variant="secondary">
				Edit
			</Button>
			<Button disabled={disabled} variant="destructive" onClick={() => deleteInvoice(id)}>
				Delete
			</Button>
			<Button disabled={disabled} onClick={() => markInvoiceAsPaid(id)}>
				Mark as Paid
			</Button>
		</>
	)
}
