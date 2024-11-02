import React, { CSSProperties, useState } from "react";
import styles from "./Accordion.module.scss";
import { Button } from "../Buttons";
import { ChevronRight } from "@mui/icons-material";
import { TColor } from "../types";

interface IAccordionBase {
	style?: CSSProperties;
	className?: string;
	children?: React.ReactNode;
	color?: TColor;
}

interface IAccordion extends IAccordionBase {
	open?: boolean;
	onOpen?: () => void;
}

export function AccordionGroup(props: IAccordionBase): JSX.Element {
	const [openIndex, setOpenIndex] = useState(-1);

	const handleOpen = (index: number) => {
		setOpenIndex(openIndex === index ? -1 : index);
	};

	return (
		<div
			className={`${styles.group} ${props.className}`}
			style={props.style}
		>
			{React.Children.toArray(props.children).map((child, index) => {
				return React.isValidElement<IAccordion>(child)
					? React.cloneElement(child, {
							open: openIndex === index,
							onOpen: () => handleOpen(index),
                            color: props.color
					  })
					: child;
			})}
		</div>
	);
}

export const Accordion: React.FC<IAccordion> = (props: IAccordion) => {
	const [open, setOpen] = useState(props.open || false);

	let containerClass = `${styles.container} ${props.className}`;

	if (props.open !== undefined) {
		containerClass += props.open ? ` ${styles.open}` : ` ${styles.close}`;
	} else {
		containerClass += open ? ` ${styles.open}` : ` ${styles.close}`;
	}

	containerClass += props.color
		? ` ${styles[props.color]}`
		: ` ${styles.primary}`;

	const handleOpen = () => {
		setOpen(!open);
		props.onOpen?.();
	};

	return (
		<div
			onClick={handleOpen}
			className={containerClass}
			style={props.style}
		>
			{props.children}
		</div>
	);
};

export const AccordionHeader: React.FC<IAccordionBase> = (
	props: IAccordionBase
) => {
	return (
		<div
			className={`${styles.header} ${props.className}`}
			style={props.style}
		>
			{props.children}
			<Button
				type="icon"
				icon={ChevronRight}
				variant="link"
				className={styles.open_btn}
			/>
		</div>
	);
};

export const AccordionContent: React.FC<IAccordionBase> = (
	props: IAccordionBase
) => {
	return (
		<div
			className={`${styles.content} ${props.className}`}
			style={props.style}
		>
			{props.children}
		</div>
	);
};
