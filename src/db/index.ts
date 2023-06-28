import { Pool as PoolNeon } from '@neondatabase/serverless'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-serverless'
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres'
import { Pool as PoolNode } from 'pg'
import { InvoiceMissingError } from '@/lib/error'
import { invoiceStatusEnum, invoices } from './schema'

export type Database = {
	invoices: typeof invoices
}

const db =
	process.env.NODE_ENV === 'production'
		? drizzleNeon<Database>(new PoolNeon({ connectionString: process.env.PG_POOLED_URI }), {
				schema: { invoices },
		  })
		: drizzleNode<Database>(
				new PoolNode({
					connectionString: process.env.PG_POOLED_URI,
				}),
				{ logger: true, schema: { invoices } }
		  )

export async function getInvoices(userId: string, statuses: string[]) {
	return db.query.invoices.findMany({
		where: ({ status, creator }, { and, eq, or, sql }) =>
			and(
				eq(creator, userId),
				statuses.length > 0
					? or(
							...statuses.map((s) => eq(status, sql`${s}::${sql.raw(invoiceStatusEnum.enumName)}`))
					  )
					: undefined
			),
	})
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
