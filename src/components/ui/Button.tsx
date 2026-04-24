import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "outline";
	loading?: boolean;
};

export default function Button({
	variant = "primary",
	loading = false,
	disabled,
	children,
	className,
	...props
}: ButtonProps) {
	const isDisabled = disabled || loading;

	return (
		<button
			className={className}
			disabled={isDisabled}
			{...props}
			data-variant={variant}
			data-loading={loading ? "true" : "false"}
		>
			{loading ? "Loading..." : children}
		</button>
	);
}
