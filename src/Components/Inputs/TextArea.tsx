import { CSSProperties } from "react";
import styles from "./Inputs.module.scss";

interface ITextArea {
	value?: string;
	onChange?: (value: string) => void;
	cols?: number;
	rows?: number;
	style?: CSSProperties;
	className?: string;
	placeholder?: string;
}

export const TextArea: React.FC<ITextArea> = (props: ITextArea) => {
	return (
		<textarea
			className={`${styles.textarea} ${props.className}`}
			cols={props.cols || 30}
			rows={props.rows || 20}
			style={props.style}
			placeholder={props.placeholder || ""}
			onChange={(e) => props.onChange?.(e.target.value)}
			value={props.value}
		/>
	);
};
