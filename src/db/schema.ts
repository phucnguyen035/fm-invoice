import { InferModel } from 'drizzle-orm'
import { index, jsonb, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import z from 'zod'

export const invoiceStatusEnum = pgEnum('status', ['draft', 'pending', 'paid'])
export const invoicePaymentTermsEnum = pgEnum('payment_terms', ['1', '7', '14', '30'])

export const Address = z.object({
	street: z.string(),
	city: z.string(),
	postCode: z.string(),
	country: z.string(),
})
export type Address = z.infer<typeof Address>

export const Item = z.object({
	name: z.string(),
	quantity: z.number().nonnegative(),
	price: z.number().nonnegative(),
})
export type Item = z.infer<typeof Item>

export const invoices = pgTable(
	'invoices',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		creator: text('invoicer').notNull(),
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
	},
	(table) => ({
		creatorIndex: index('creator_idx').on(table.creator),
	})
)
export type Invoice = InferModel<typeof invoices>

const insertInvoiceSchema = createInsertSchema(invoices, {
	addressFrom: Address,
	addressTo: Address,
	items: Item.array(),
})

export type NewInvoice = z.infer<typeof insertInvoiceSchema>
