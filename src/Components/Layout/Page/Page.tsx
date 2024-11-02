import { AccountTreeOutlined, ExtensionOutlined, HomeOutlined } from "@mui/icons-material";
import { ISlideInMenuItem, SlideInMenu } from "../../Menu/SlideIn";
import styles from "./Page.module.scss";
import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

interface IPage {
	style?: CSSProperties;
	className?: string;
	children?: React.ReactNode;
}

export const Page: React.FC<IPage> = (props: IPage) => {
	const navigator = useNavigate();

	const items: ISlideInMenuItem[] = [
		{
			type: "button",
			label: "Home",
			icon: HomeOutlined,
			onClick: () => {
				navigator("/");
			},
		},
		{
			type: "button",
			label: "Editor",
			icon: AccountTreeOutlined,
			onClick: () => {
				navigator("/editor");
			},
		},
		{
			type: "button",
			label: "Components",
			icon: ExtensionOutlined,
			onClick: () => {
				navigator("/dev/components");
			},
		},
	];
	

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
