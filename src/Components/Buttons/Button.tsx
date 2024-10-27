import { CSSProperties } from "react";
import styles from "./Button.module.scss";

interface IButton {
	className?: string;
	style?: CSSProperties;
	onClick?: () => void;
	label: string;
}

export const Button: React.FC<IButton> = (props: IButton) => {
	return (
		<button
			className={`${styles.button} ${props.className}`}
			style={props.style}
			onClick={props.onClick}
		>
            {props.label}
        </button>
	);
};
