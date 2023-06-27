import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Get the first 6 characters of the last part of a UUUID v4
 */
export function getInvoiceId(id: string) {
	if (!z.string().uuid().safeParse(id).success) {
		throw new Error('Invoice ID must be a UUID!')
	}

	return id.split('-').pop()?.slice(0, 6)?.toUpperCase() ?? ''
}
