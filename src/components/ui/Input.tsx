import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
};

export default function Input({ label, id, className, ...props }: InputProps) {
	const inputId = id ?? props.name;

	return (
		<div className="ui-input-root">
			{label ? (
				<label htmlFor={inputId} className="ui-input-label">
					{label}
				</label>
			) : null}
			<input
				id={inputId}
				className={className}
				{...props}
			/>
		</div>
	);
}
