import styles from './ActionButton.module.css';

export default function ActionButton({
	children,
	onClick,
	disabled,
	className,
}: {
	children: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
	className?: string;
}) {
	return (
		<button
			className={[styles.actionButton, className].join(' ')}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
