import { cookies } from 'next/headers'
import { themeKey } from './constants'

export function getTheme(key = themeKey) {
	return cookies().get(key)?.value ?? 'dark'
}
