import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import { InvoiceCard, InvoiceCardContent, InvoiceCardHeader } from '@/components/InvoiceCard'
import { getInvoices } from '@/db'
import Empty from '../assets/empty.svg'
import PageSection from './PageSection'

export default async function Home() {
	const { userId } = auth()
	const invoices = await getInvoices(userId ?? '')

	return (
		<PageSection invoiceAmount={invoices.length}>
			{invoices.length > 0 ? (
				invoices.map((invoice) => (
					<InvoiceCard
						key={invoice.id}
						invoice={invoice}
						header={<InvoiceCardHeader />}
						content={<InvoiceCardContent />}
					/>
				))
			) : (
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
			)}
		</PageSection>
	)
}
