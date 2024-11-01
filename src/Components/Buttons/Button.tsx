import { TButton } from ".";
import styles from "./Button.module.scss";

export const Button: React.FC<TButton> = (props: TButton) => {
	let btn_class = `${props.className}`;
	btn_class += props.variant
		? ` ${styles[props.variant]}`
		: ` ${styles["contained"]}`;
	btn_class += props.size ? ` ${styles[props.size]}` : ` ${styles["medium"]}`;
	btn_class += props.color
		? ` ${styles[props.color]}`
		: ` ${styles["primary"]}`;
	btn_class += props.shape
		? ` ${styles[props.shape]}`
		: ` ${styles["squared"]}`;

	switch (props.type) {
		case "icon":
			return (
				<button
					className={`${styles.iconButton} ${btn_class}`}
					style={props.style}
					onClick={props.onClick}
				>
					<props.icon fontSize={props.size || "medium"} />
				</button>
			);
		case "button":
		default:
			return (
				<button
					className={`${styles.button} ${btn_class}`}
					style={props.style}
					onClick={props.onClick}
				>
					{props.startIcon && (
						<props.startIcon fontSize={props.size || "medium"} />
					)}
					{props.label}
					{props.endIcon && (
						<props.endIcon fontSize={props.size || "medium"} />
					)}
				</button>
			);
	}
};
