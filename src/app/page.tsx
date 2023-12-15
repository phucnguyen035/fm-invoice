import Image from 'next/image'
import { InvoiceCard } from '@/components/InvoiceCard'
import { getInvoices } from '@/db'
import { type Invoice } from '@/db/schema'
import Empty from '../assets/empty.svg'
import PageSection from './PageSection'

export default async function Home({ searchParams }: { searchParams: { status?: string } }) {
	const statuses = [...new Set(searchParams.status?.split(','))].filter(Boolean)
	const invoices = await getInvoices(statuses)

	return (
		<PageSection invoiceAmount={invoices.length}>
			{invoices.length > 0 ? <InvoiceList invoices={invoices} /> : <InvoiceEmptyList />}
		</PageSection>
	)
}

type InvoiceListProps = {
	invoices: Array<
		Pick<Invoice, 'id' | 'status' | 'dueDate' | 'clientName'> & { totalPrice: number }
	>
}

function InvoiceList({ invoices }: InvoiceListProps) {
	return invoices.map((invoice) => (
		<InvoiceCard
			key={invoice.id}
			totalPrice={invoice.totalPrice}
			id={invoice.id}
			status={invoice.status}
			dueDate={invoice.dueDate}
			clientName={invoice.clientName}
		/>
	))
}

function InvoiceEmptyList() {
	return (
		<div className="grid h-full place-items-center">
			<div className="mx-auto max-w-[217px] text-center md:max-w-[242px]">
				<Image src={Empty} alt="woman holding loud speaker" className="mx-auto" />
				<h1 className="mb-6 mt-10 text-h2">There is nothing here</h1>
				<p className="text-body1">
					Create an invoice by clicking the{' '}
					<span className="font-bold">
						New <span className="hidden md:inline"> Invoice</span>
					</span>{' '}
					button and get started
				</p>
			</div>
		</div>
	)
}
