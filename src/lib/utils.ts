import { ClassValue, clsx } from 'clsx'
import { cookies } from 'next/headers'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import { themeKey } from './constants'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getTheme(key = themeKey) {
	return cookies().get(key)?.value ?? 'dark'
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
