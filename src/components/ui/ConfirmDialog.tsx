"use client";

import { useEffect, useRef } from "react";
import styles from "./ConfirmDialog.module.css";

type ConfirmDialogProps = {
	open: boolean;
	title?: string;
	message: string;
	confirmLabel?: string;
	cancelLabel?: string;
	variant?: "danger" | "default";
	onConfirm: () => void;
	onCancel: () => void;
};

export default function ConfirmDialog({
	open,
	title = "Confirm",
	message,
	confirmLabel = "Delete",
	cancelLabel = "Cancel",
	variant = "danger",
	onConfirm,
	onCancel,
}: ConfirmDialogProps) {
	const dialogRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleKey(event: KeyboardEvent) {
			if (!open) return;
			if (event.key === "Escape") onCancel();
		}

		document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, [open, onCancel]);

	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
			dialogRef.current?.focus();
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	if (!open) return null;

	return (
		<div className={styles.overlay} onClick={onCancel} role="dialog" aria-modal="true" aria-label={title}>
			<div
				className={styles.dialog}
				onClick={(event) => event.stopPropagation()}
				tabIndex={-1}
				ref={dialogRef}
			>
				<div className={styles.iconWrap}>
					<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
						<circle cx="11" cy="11" r="10" stroke={variant === "danger" ? "#DC2626" : "#006766"} strokeWidth="1.5" />
						<path d="M11 7V12" stroke={variant === "danger" ? "#DC2626" : "#006766"} strokeWidth="2" strokeLinecap="round" />
						<circle cx="11" cy="15.5" r="1" fill={variant === "danger" ? "#DC2626" : "#006766"} />
					</svg>
				</div>

				<h3 className={styles.title}>{title}</h3>
				<p className={styles.message}>{message}</p>

				<div className={styles.actions}>
					<button type="button" className={styles.cancelBtn} onClick={onCancel}>
						{cancelLabel}
					</button>
					<button
						type="button"
						className={`${styles.confirmBtn} ${variant === "danger" ? styles.dangerBtn : styles.defaultBtn}`}
						onClick={onConfirm}
					>
						{confirmLabel}
					</button>
				</div>
			</div>
		</div>
	);
}
