import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-button text-h4 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-secondary',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				secondary:
					'bg-accent text-gray-dark dark:text-gray hover:bg-muted hover:dark:text-gray-accented dark:bg-input',
				ghost:
					'bg-accent text-accent-foreground hover:bg-muted dark:bg-background dark:text-gray hover:dark:bg-white',
			},
			size: {
				default: 'h-10 px-6 py-4',
				icon: 'pl-2 pr-4 py-2',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, children, icon, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
				{icon && (
					<span className="mr-2 grid h-8 w-8 place-items-center rounded-full bg-white md:mr-4">
						{icon}
					</span>
				)}
				{children}
			</Comp>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
