import { createContext, useContext } from 'react'
import { type Invoice } from '@/db/schema'

export const InvoiceContext = createContext<Partial<Invoice & { totalPrice: number }> | null>(null)

export function useInvoice() {
	const invoice = useContext(InvoiceContext)
	if (!invoice) {
		throw new Error('useInvoiceCard must be used within a InvoiceCardProvider')
	}

	return invoice
}
