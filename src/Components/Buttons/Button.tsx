import { CSSProperties } from "react";
import styles from "./Button.module.scss";

interface IButton {
	className?: string;
	style?: CSSProperties;
	onClick?: () => void;
	label: string;
	variant?: "contained" | "outlined" | "link";
}

export const Button: React.FC<IButton> = (props: IButton) => {
	let btn_class = `${styles.button} ${props.className}`;
	btn_class += props.variant ? ` ${styles[props.variant]}` : "";

	return (
		<button
			className={btn_class}
			style={props.style}
			onClick={props.onClick}
		>
			{props.label}
		</button>
	);
};
