/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			spacing: {
				4.5: '1.125rem',
				18: '4.5rem',
				26: '6.5rem',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				warning: 'hsl(var(--warning))',
				success: 'hsl(var(--success))',
				gray: {
					DEFAULT: 'hsl(231 73% 93%)',
					dark: 'hsl(231 20% 61%)',
					darker: 'hsl(231 20% 27%)',
					accented: 'hsl(231 37% 63%)',
				},
				black: {
					draft: 'hsl(231, 20%, 27%)',
				},
			},
			borderRadius: {
				button: '1.5rem',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			fontSize: {
				h1: ['2rem', { fontWeight: 700, lineHeight: '36px', letterSpacing: -1 }],
				h2: ['1.25rem', { fontWeight: 700, lineHeight: '22px', letterSpacing: -0.8 }],
				h3: ['1rem', { fontWeight: 700, lineHeight: '24px', letterSpacing: -0.8 }],
				h4: ['0.75rem', { fontWeight: 700, lineHeight: '15px', letterSpacing: -0.25 }],
				body1: ['0.75rem', { fontWeight: 500, lineHeight: '15px', letterSpacing: -0.25 }],
				body2: ['0.6875rem', { fontWeight: 500, lineHeight: '18px', letterSpacing: -0.23 }],
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
