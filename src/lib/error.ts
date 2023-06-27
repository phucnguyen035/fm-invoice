export class InvoiceMissingError extends Error {
	constructor(id: string) {
		super(`Invoice with id ${id} not found`)
	}
}
