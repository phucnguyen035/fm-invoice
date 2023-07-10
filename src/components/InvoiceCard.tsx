'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { type Invoice } from '@/db/schema'
import { locale } from '@/lib/constants'
import { getInvoiceId } from '@/lib/utils'
import { InvoiceStatus } from './InvoiceStatus'
import { Card, CardContent, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'

type Props =
	| {
			loading?: false
			id: string
			clientName: string
			status: Invoice['status']
			dueDate: Date
			totalPrice: number
	  }
	| { loading: true }

export function InvoiceCard(props: Props) {
	if (props.loading) {
		return <InvoiceCardSkeleton />
	}

	const { dueDate, totalPrice, id, clientName, status } = props

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
		<Card className="border-none shadow-none transition-[filter] hover:brightness-95 dark:hover:brightness-90">
			<Link href={`/invoice/${id}`} className="">
				{/* Mobile */}
				<div className="md:hidden">
					<CardHeader className="flex flex-row items-end justify-between">
						<h2 className="text-body1 text-popover-foreground">
							<span className="text-gray-accented">#</span>
							{getInvoiceId(id)}
						</h2>
						<span className="text-body1 capitalize">{clientName}</span>
					</CardHeader>

					<CardContent className="flex items-center justify-between">
						<div className="space-y-2">
							<p className="text-body1 text-gray-accented dark:text-gray">Due {formattedDueDate}</p>
							<p className="text-h3 text-popover-foreground">{formattedAmount}</p>
						</div>
						<InvoiceStatus status={status} />
					</CardContent>
				</div>

				{/* Desktop */}
				<div className="hidden md:block">
					<CardContent className="grid grid-cols-5 items-center px-6 py-4">
						<span className="text-h4 text-popover-foreground">
							<span className="text-gray-accented">#</span>
							{getInvoiceId(id)}
						</span>
						<span className="text-body1 font-light">{formattedDueDate}</span>
						<span className="text-body1">{clientName}</span>
						<span className="text-h3 text-popover-foreground">{formattedAmount}</span>
						<div className="flex items-center space-x-5">
							<InvoiceStatus status={status} />
							<ChevronRight className="h-2 stroke-primary" />
						</div>
					</CardContent>
				</div>
			</Link>
		</Card>
	)
}

function InvoiceCardSkeleton() {
	return (
		<Card className="border-none shadow-none">
			<div className="md:hidden">
				<CardContent className="space-y-6 p-6">
					<div className="flex items-center justify-between">
						<Skeleton className="h-3 w-20" />
						<Skeleton className="h-3 w-24" />
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-2">
							<Skeleton className="h-3 w-28" />
							<Skeleton className="h-6 w-24" />
						</div>

						<Skeleton className="h-10 w-26" />
					</div>
				</CardContent>
			</div>

			<div className="hidden md:block">
				<CardContent className="grid grid-cols-5 items-center px-6 py-4">
					<Skeleton className="h-3 w-16" />
					<Skeleton className="h-3 w-24" />
					<Skeleton className="h-3 w-24" />
					<Skeleton className="h-4 w-28" />
					<Skeleton className="h-10 w-24" />
				</CardContent>
			</div>
		</Card>
	)
}
