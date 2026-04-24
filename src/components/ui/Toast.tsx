import React from "react";

type ToastProps = {
	type: "success" | "error";
	message: string;
	onClose?: () => void;
};

export default function Toast({ type, message, onClose }: ToastProps) {
	return (
		<div
			role="status"
			aria-live="polite"
			className="ui-toast"
			data-type={type}
		>
			<span>{message}</span>
			{onClose ? (
				<button
					type="button"
					onClick={onClose}
					aria-label="Close notification"
					className="ui-toast-close"
				>
					x
				</button>
			) : null}
		</div>
	);
}
