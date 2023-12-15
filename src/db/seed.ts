require('dotenv').config({ path: './.env.local' })

import { faker } from '@faker-js/faker'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { NewInvoice, invoicePaymentTermsEnum, invoiceStatusEnum, invoicesTable } from './schema'

async function seed() {
	const pool = new Pool({
		connectionString: process.env.PG_DIRECT_URI,
		ssl: { rejectUnauthorized: false },
	})
	const db = drizzle(pool, { logger: true })

	await db.transaction(async (tx) => {
		await tx.delete(invoicesTable)
		await tx.insert(invoicesTable).values(createInvoices())
	})
}

function createInvoices(length = 10) {
	return Array.from(
		{ length },
		() =>
			({
				addressFrom: {
					city: faker.location.city(),
					country: faker.location.country(),
					postCode: faker.location.zipCode(),
					street: faker.location.streetAddress(),
				},
				addressTo: {
					city: faker.location.city(),
					country: faker.location.country(),
					postCode: faker.location.zipCode(),
					street: faker.location.streetAddress(),
				},
				clientEmail: faker.internet.email(),
				clientName: faker.person.fullName(),
				dueDate: faker.date.future(),
				issueDate: faker.date.past(),
				description: faker.commerce.productName(),
				paymentTerms: faker.helpers.arrayElement(invoicePaymentTermsEnum.enumValues),
				status: faker.helpers.arrayElement(invoiceStatusEnum.enumValues),
				items: Array.from(
					{ length: faker.helpers.rangeToNumber({ min: 2, max: length / 2 }) },
					() => ({
						name: faker.commerce.productName(),
						price: faker.number.float({ min: 1, max: 1000, precision: 0.01 }),
						quantity: parseInt(faker.finance.amount(1, 10)),
					})
				),
			} satisfies NewInvoice)
	)
}

seed()
	.then(() => {
		console.log('SEEDING DONE ✅')
		process.exit()
	})
	.catch((err) => {
		console.error(err)
		process.exit(1)
	})
