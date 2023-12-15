import { jsonb, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const invoiceStatusEnum = pgEnum('status', ['draft', 'pending', 'paid'])
export const invoicePaymentTermsEnum = pgEnum('payment_terms', ['1', '7', '14', '30'])

export type Address = {
	street: string
	city: string
	postCode: string
	country: string
}

export type Item = {
	name: string
	quantity: number
	price: number
}

export const invoicesTable = pgTable('invoices', {
	id: uuid('id').primaryKey().defaultRandom(),
	status: invoiceStatusEnum('status').default('draft').notNull(),
	issueDate: timestamp('issue_date').notNull(),
	description: text('description'),
	dueDate: timestamp('due_date').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
	items: jsonb('items').$type<Item[]>().notNull(),
	addressFrom: jsonb('address_from').$type<Address>().notNull(),
	addressTo: jsonb('adress_to').$type<Address>().notNull(),
	clientName: text('client_name').notNull(),
	clientEmail: text('client_email').notNull(),
	paymentTerms: invoicePaymentTermsEnum('payment_terms').notNull(),
})
export type Invoice = typeof invoicesTable.$inferSelect
export type NewInvoice = typeof invoicesTable.$inferInsert
