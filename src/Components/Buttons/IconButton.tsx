import React, { CSSProperties } from "react";
import styles from "./Button.module.scss";

interface IIconButton {
	className?: string;
	style?: CSSProperties;
	onClick?: () => void;
	icon: React.ReactNode;
	variant?: "contained" | "outlined" | "link";
}

export const IconButton: React.FC<IIconButton> = (props: IIconButton) => {

	let btn_class = `${styles.iconButton} ${props.className}`;
	btn_class += props.variant ? ` ${styles[props.variant]}` : "";

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
