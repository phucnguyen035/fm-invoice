import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { getTheme } from '@/lib/utils'

export default function AuthProvider({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: getTheme() === 'dark' ? dark : undefined,
				variables: {},
				elements: {
					badge: 'bg-primary text-white',
					profileSectionPrimaryButton: 'text-primary dark:text-secondary',
					card: 'bg-background dark:text-white',
					userButtonPopoverCard: 'bg-background',
					avatarBox: 'xl:w-10 xl:h-10',
				},
			}}
		>
			{children}
		</ClerkProvider>
	)
}
