import { useState } from "react";
import styles from "./SlideInMenu.module.scss";
import { IconButton } from "../../Buttons/IconButton";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ISlideInMenu } from "./SlideInMenu.types";
import { Button } from "../../Buttons/Button";

export const SlideInMenu: React.FC<ISlideInMenu> = (props: ISlideInMenu) => {
	const [open, setOpen] = useState(false);

	let containerClass = styles.container;
	containerClass += open ? " " : ` ${styles.close}`;
	containerClass +=
		props.direction === "right" ? ` ${styles.right}` : ` ${styles.left}`;
	containerClass +=
		props.position === "bottom" ? ` ${styles.bottom}` : ` ${styles.top}`;

	return (
		<div className={containerClass} style={props.style}>
			<IconButton
				icon={open ? <ChevronLeft /> : <ChevronRight />}
				className={styles.open_btn}
				onClick={() => setOpen(!open)}
			/>
			<div className={`${styles.menuItems} ${open ? "" : styles.close}`}>
				{props.items.map((item, index) => {
					switch (item.type) {
						case "icon":
							return (
								<IconButton
									key={index}
									icon={item.icon}
									onClick={item.onClick}
									variant="link"
								/>
							);
						case "button":
							return (
								<Button
									key={index}
									className={styles.item}
									onClick={item.onClick}
									label={item.label}
									variant="link"
									color="dark"
								/>
							);
						case "separator":
							return <p key={index}>|</p>;
					}
				})}
			</div>
		</div>
	);
};
