import { ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'
import { z } from 'zod'

const customTwMerge = extendTailwindMerge({
	classGroups: {
		'font-size': [{ text: ['h1', 'h2', 'h3', 'h4', 'body1', 'body2'] }],
	},
})

export function cn(...inputs: ClassValue[]) {
	return customTwMerge(clsx(inputs))
}

/**
 * Get the first 6 characters of the last part of a UUUID v4
 */
export function getShortenedInvoiceId(id: string) {
	if (!z.string().uuid().safeParse(id).success) {
		throw new Error('Invoice ID must be a UUID!')
	}

	return id.split('-').pop()?.slice(0, 6)?.toUpperCase() ?? ''
}
