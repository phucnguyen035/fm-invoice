import { ReactNode } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import IconPlus from '../assets/icon-plus.svg'
import Filter from './Filter'

type Props = {
	invoiceAmount?: number
	disabled?: boolean
	children: ReactNode
}

export default function PageSection({ invoiceAmount = 0, disabled = false, children }: Props) {
	return (
		<>
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-h2 font-bold">Invoices</h1>
					<p>{invoiceAmount} invoices</p>
				</div>

				<div className="flex items-center space-x-4.5 md:space-x-10">
					<Filter disabled={disabled} />
					<Button disabled={disabled} size="icon" icon={<Image alt="add invoice" src={IconPlus} />}>
						<span>
							New <span className="hidden md:inline">Invoice</span>
						</span>
					</Button>
				</div>
			</div>
			<div className="flex-grow space-y-4">{children}</div>
		</>
	)
}
