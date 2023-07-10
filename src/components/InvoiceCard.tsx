'use client'

import Link from 'next/link'
import { type Invoice } from '@/db/schema'
import { locale } from '@/lib/constants'
import { getInvoiceId } from '@/lib/utils'
import { InvoiceStatus } from './InvoiceStatus'
import { Card, CardContent, CardHeader } from './ui/card'

type Props = {
	id: string
	clientName: string
	status: Invoice['status']
	dueDate: Date
	totalPrice: number
}

export function InvoiceCard({ id, clientName, status, dueDate, totalPrice }: Props) {
	const formattedDueDate = new Intl.DateTimeFormat(locale, {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	}).format(dueDate)

	const formattedAmount = new Intl.NumberFormat(locale, {
		currency: 'GBP',
		style: 'currency',
	}).format(totalPrice ?? 0)

	return (
		<Card className="border-none shadow-none">
			<Link href={`/invoice/${id}`} className="">
				<CardHeader className="flex flex-row items-end justify-between">
					<h2 className="text-body1">
						<span className="text-gray-accented">#</span>
						{getInvoiceId(id)}
					</h2>
					<span className="text-body1 capitalize">{clientName}</span>
				</CardHeader>

				<CardContent className="flex items-center justify-between">
					<div className="space-y-2">
						<p className="text-body1 text-gray-accented dark:text-gray">Due {formattedDueDate}</p>
						<p className="text-h3">{formattedAmount}</p>
					</div>
					<InvoiceStatus status={status} />
				</CardContent>
			</Link>
		</Card>
	)
}
