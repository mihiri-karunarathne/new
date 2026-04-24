import React from "react";

type SelectOption = {
	value: string;
	label: string;
};

type SelectProps = {
	label?: string;
	name?: string;
	value?: string;
	placeholder?: string;
	options: SelectOption[];
	onChange?: (value: string) => void;
	required?: boolean;
	className?: string;
	compact?: boolean;
};

export default function Select({
	label,
	name,
	value = "",
	placeholder,
	options,
	onChange,
	required,
	className,
	compact = false,
}: SelectProps) {
	const selectId = name;
	const selectClassName = [className, compact ? "ui-select-compact" : ""].filter(Boolean).join(" ");

	return (
		<div className="ui-select-root">
			{label ? (
				<label htmlFor={selectId} className="ui-select-label">
					{label}
				</label>
			) : null}
			<select
				id={selectId}
				name={name}
				value={value}
				required={required}
				className={selectClassName}
				onChange={(event) => onChange?.(event.target.value)}
			>
				{placeholder ? <option value="">{placeholder}</option> : null}
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}
