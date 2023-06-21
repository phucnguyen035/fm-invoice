import { ClassValue, clsx } from 'clsx'
import { cookies } from 'next/headers'
import { twMerge } from 'tailwind-merge'
import { themeKey } from './constants'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getTheme(key = themeKey) {
	return cookies().get(key)?.value ?? 'dark'
}
