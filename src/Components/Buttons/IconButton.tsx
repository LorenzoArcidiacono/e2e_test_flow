import React, { CSSProperties } from "react";
import styles from "./Button.module.scss";
import { TColor, TSize, TVariant } from "../types";

interface IIconButton {
	className?: string;
	style?: CSSProperties;
	onClick?: () => void;
	icon: React.ReactNode;
	variant?: TVariant;
	size?: TSize;
	color?: TColor;
}

export const IconButton: React.FC<IIconButton> = (props: IIconButton) => {

	let btn_class = `${styles.button} ${props.className}`;
	btn_class += props.variant ? ` ${styles[props.variant]}` : ` ${styles['contained']}`;
	btn_class += props.size ? ` ${styles[props.size]}` : ` ${styles['medium']}`;
	btn_class += props.color ? ` ${styles[props.color]}` : ` ${styles['primary']}`;

	return (
		<button
			className={btn_class}
			style={props.style}
			onClick={props.onClick}
		>
			{props.icon}
		</button>
	);
};
