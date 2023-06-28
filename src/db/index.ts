import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { InvoiceMissingError } from '@/lib/error'
import { invoices } from './schema'

export type Database = {
	invoices: typeof invoices
}

export function createDb(connectionString = process.env.PG_POOLED_URI) {
	const pool = new Pool({
		connectionString: process.env.PG_POOLED_URI,
		ssl: {
			rejectUnauthorized: process.env.NODE_ENV === 'production',
		},
	})

	return drizzle<Database>(pool, {
		logger: process.env.NODE_ENV !== 'production',
		schema: { invoices },
	})
}

export const db = createDb()

export async function getInvoices(userId: string) {
	return db.query.invoices.findMany({ where: ({ creator }, { eq }) => eq(creator, userId) })
}

export async function getInvoiceFromId(invoiceId: string, userId: string) {
	const invoice = await db.query.invoices.findFirst({
		where: ({ id, creator }, { eq, and }) => and(eq(id, invoiceId), eq(creator, userId)),
	})

	if (!invoice) {
		throw new InvoiceMissingError(invoiceId)
	}

	return invoice
}
