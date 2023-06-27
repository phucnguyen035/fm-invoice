import { useId } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { invoiceStatusEnum } from '@/db/schema'

type Props = {
	disabled?: boolean
}

export default function Filter({ disabled = false }: Props) {
	return (
		<Select disabled={disabled}>
			<SelectTrigger className="w-auto justify-normal space-x-3 border-none md:space-x-4">
				<SelectValue
					className="text-h4"
					placeholder={
						<>
							<span className="md:hidden">Filter</span>
							<span className="hidden md:inline-block">Filter by status</span>
						</>
					}
				/>
			</SelectTrigger>
			<SelectContent className="p-0">
				<ul className="space-y-4 p-6 md:w-[192px]">
					{invoiceStatusEnum.enumValues.map((status) => (
						<SelectCheckbox key={status} label={status} />
					))}
				</ul>
			</SelectContent>
		</Select>
	)
}

function SelectCheckbox({ label }: { label: string }) {
	const id = useId()

	return (
		<li className="flex items-center space-x-3">
			<Checkbox id={id} />

			<label
				htmlFor={id}
				className="cursor-pointer text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				{label}
			</label>
		</li>
	)
}
