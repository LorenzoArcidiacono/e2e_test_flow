import { CSSProperties } from "react";
import styles from "./Card.module.scss";
import { Close } from "@mui/icons-material";
import { Button } from "../Buttons";

export interface ICard {
	className?: string;
	style?: CSSProperties;
	children?: React.ReactNode;
	onClose?: () => void;
}

export const Card: React.FC<ICard> = (props: ICard) => {
	return (
		<div
			className={`${styles.card} ${props.className}`}
			style={props.style}
		>
			{props.onClose && (
				<Button
					type="icon"
					className={styles.card_close_btn}
					onClick={props.onClose}
                    icon={Close}
                    variant="link"
				/>
			)}
			{props.children}
		</div>
	);
};

export const CardHeader: React.FC<ICard> = (props: ICard) => {
	return (
		<div
			className={`${styles.card_header} ${props.className}`}
			style={props.style}
		>
			{props.children}
		</div>
	);
};

export const CardContent: React.FC<ICard> = (props: ICard) => {
	return (
		<div
			className={`${styles.card_content} ${props.className}`}
			style={props.style}
		>
			{props.children}
		</div>
	);
};

export const CardActions: React.FC<ICard> = (props: ICard) => {
	return (
		<div
			className={`${styles.card_actions} ${props.className}`}
			style={props.style}
		>
			{props.children}
		</div>
	);
};
