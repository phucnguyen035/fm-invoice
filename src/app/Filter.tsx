'use client'

import { useId, useState } from 'react'
import { CheckedState } from '@radix-ui/react-checkbox'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { invoiceStatusEnum } from '@/db/schema'

type Props = {
	disabled?: boolean
}

export default function Filter({ disabled = false }: Props) {
	const pathname = usePathname()
	const router = useRouter()
	const params = useSearchParams()
	const [statuses, setStatuses] = useState(() => params.get('status')?.split(',') ?? [])

	return (
		<Select
			disabled={disabled}
			onOpenChange={(open) => {
				if (open) {
					return
				}

				router.push(pathname + `?status=${statuses.join(',')}`)
			}}
		>
			<SelectTrigger
				aria-labelledby="filter"
				className="w-auto justify-normal space-x-3 border-none md:space-x-4"
			>
				<SelectValue
					className="text-h4"
					placeholder={
						<>
							<span className="md:hidden">Filter</span>
							<span id="filter" className="hidden md:inline-block">
								Filter by status
							</span>
						</>
					}
				/>
			</SelectTrigger>
			<SelectContent className="p-0">
				<ul className="space-y-4 p-6 md:w-[192px]">
					{invoiceStatusEnum.enumValues.map((status) => (
						<SelectCheckbox
							key={status}
							label={status}
							checked={statuses.includes(status)}
							onCheck={(value, checked) => {
								if (checked) {
									setStatuses((status) => [...status, value])
								} else {
									setStatuses((status) => status.filter((s) => s !== value))
								}
							}}
						/>
					))}
				</ul>
			</SelectContent>
		</Select>
	)
}

function SelectCheckbox({
	label,
	checked,
	onCheck,
}: {
	label: string
	checked: boolean
	onCheck: (value: string, checked: CheckedState) => void
}) {
	const id = useId()

	return (
		<li className="flex items-center space-x-3">
			<Checkbox id={id} checked={checked} onCheckedChange={(checked) => onCheck(label, checked)} />

			<label
				htmlFor={id}
				className="cursor-pointer text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				{label}
			</label>
		</li>
	)
}
