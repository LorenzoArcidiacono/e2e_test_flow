import { AccountTreeOutlined, HomeOutlined } from "@mui/icons-material";
import { ISlideInMenuItem, SlideInMenu } from "../../Menu/SlideIn";
import styles from "./Page.module.scss";
import { CSSProperties } from "react";

interface IPage {
	style?: CSSProperties;
	className?: string;
	children?: React.ReactNode;
}

const items: ISlideInMenuItem[] = [
	{
		type: "button",
		label: "Home",
		icon: HomeOutlined,
		onClick: () => {
			console.log("Home clicked");
		},
	},
	{
		type: "button",
		label: "Editor",
		icon: AccountTreeOutlined,
		onClick: () => {
			console.log("Editor clicked");
		},
	},
];

export const Page: React.FC<IPage> = (props: IPage) => {
	return (
		<div
			className={`${props.className} ${styles.page}`}
			style={props.style}
		>
			<SlideInMenu items={items} />
			{props.children}
		</div>
	);
};
