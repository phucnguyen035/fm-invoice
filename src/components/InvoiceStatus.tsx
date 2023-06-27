import { type Invoice } from '@/db/schema'
import { cn } from '@/lib/utils'

export function InvoiceStatus({ status }: Pick<Invoice, 'status'>) {
	let color = 'black-draft dark:gray'
	switch (status) {
		case 'paid':
			color = 'text-success'
			break
		case 'pending':
			color = 'text-warning'
			break
		default:
			break
	}

	let bg = 'bg-black-draft/5 dark:bg-gray/5'
	switch (status) {
		case 'paid':
			bg = 'bg-success/5'
			break
		case 'pending':
			bg = 'bg-warning/5'
		default:
			break
	}

	let indicatorBg = 'bg-black-draft dark:bg-gray'
	switch (status) {
		case 'paid':
			indicatorBg = 'bg-success'
			break
		case 'pending':
			indicatorBg = 'bg-warning'
			break
		default:
			break
	}

	return (
		<div
			className={cn(
				'flex w-[104px] items-center justify-center space-x-2 rounded-sm py-3',
				color,
				bg
			)}
		>
			<span className={cn('inline-block h-2 w-2 rounded-full', indicatorBg)} />
			<span className="text-h4 capitalize">{status}</span>
		</div>
	)
}
