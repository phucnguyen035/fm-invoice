'use server'

import { Pool } from '@neondatabase/serverless'
import { eq, notInArray, or, sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/neon-serverless'
import { InvoiceMissingError } from '@/lib/error'
import { Item, invoiceStatusEnum, invoicesTable } from './schema'

export type Database = {
	invoices: typeof invoicesTable
}

const db = drizzle<Database>(new Pool({ connectionString: process.env.PG_POOLED_URI }), {
	schema: { invoices: invoicesTable },
	logger: process.env.NODE_ENV === 'production',
})

export async function getInvoices(statuses: string[]) {
	const sq = db.$with('sq').as(
		db
			.select({
				id: invoicesTable.id,
				status: invoicesTable.status,
				clientName: invoicesTable.clientName,
				dueDate: invoicesTable.dueDate,
				item: sql<Item>`jsonb_array_elements(${invoicesTable.items})`.as('item'),
			})
			.from(invoicesTable)
	)

	return db
		.with(sq)
		.select({
			id: sq.id,
			status: sq.status,
			clientName: sq.clientName,
			dueDate: sq.dueDate,
			totalPrice:
				sql<number>`CAST(SUM((${sq.item}->>'price')::numeric * (${sq.item}->>'quantity')::numeric) AS REAL)`.as(
					'total_price'
				),
		})
		.from(sq)
		.groupBy(sq.id, sq.status, sq.clientName, sq.dueDate)
		.where(
			statuses.length > 0
				? or(
						...statuses.map((s) => eq(sq.status, sql`${s}::${sql.raw(invoiceStatusEnum.enumName)}`))
					)
				: undefined
		)
}

export async function getInvoiceFromId(invoiceId: string) {
	const invoice = await db.query.invoices.findFirst({
		where: ({ id }, { eq }) => eq(id, invoiceId),
	})

	if (!invoice) {
		throw new InvoiceMissingError(invoiceId)
	}

	return invoice
}

export async function resetInvoices() {
	const result = await db
		.delete(invoicesTable)
		.where(
			notInArray(
				invoicesTable.id,
				db.select({ id: invoicesTable.id }).from(invoicesTable).offset(10)
			)
		)

	return result.rowCount
}

export async function countInvoices() {
	const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(invoicesTable)

	return count
}

export async function deleteInvoice(id: string) {
	// TODO: Implement
}

export async function markInvoiceAsPaid(id: string) {
	// TODO: Implement
}
