'use client'

import { type ReactNode } from 'react'
import Link from 'next/link'
import { Invoice } from '@/db/schema'
import { InvoiceContext, useInvoice } from '@/hooks/useInvoice'
import { getInvoiceId } from '@/lib/utils'
import { InvoiceStatus } from './InvoiceStatus'
import { Card, CardContent, CardHeader } from './ui/card'

type Props = {
	header?: ReactNode
	content?: ReactNode
	invoice?: Partial<Invoice> | null
}

export function InvoiceCard({ header, content, invoice = null }: Props) {
	return (
		<InvoiceContext.Provider value={invoice}>
			<Card className="border-none shadow-none">
				<Link href={invoice ? `/invoice/${invoice.id}` : '/'}>
					<CardHeader className="flex flex-row items-end justify-between">{header}</CardHeader>
					<CardContent className="flex items-center justify-between">{content}</CardContent>
				</Link>
			</Card>
		</InvoiceContext.Provider>
	)
}

export function InvoiceCardHeader() {
	const { id, clientName } = useInvoice()

	return (
		<>
			<h2 className="text-body1">
				<span className="text-gray-accented">#</span>
				{getInvoiceId(id ?? '')}
			</h2>
			<span className="text-body1 capitalize">{clientName}</span>
		</>
	)
}

export function InvoiceCardContent() {
	const locale = 'en-GB'
	const { dueDate, status, totalPrice } = useInvoice()

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
		<>
			<div className="space-y-2">
				<p className="text-body1 text-gray-accented dark:text-gray">Due {formattedDueDate}</p>
				<p className="text-h3">{formattedAmount}</p>
			</div>

			{status && <InvoiceStatus status={status} />}
		</>
	)
}
