import { NextResponse } from 'next/server'
import { countInvoices, resetInvoices } from '@/db'

export async function GET() {
	const count = await countInvoices()

	return count > 20
		? NextResponse.json({ deleted: await resetInvoices() })
		: NextResponse.json({ count })
}
