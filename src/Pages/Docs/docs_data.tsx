import React from "react";
import styles from "./Docs.module.scss";

interface IAccordionGroup {
	type: "accordion_group";
	content: IAccordion[];
}

interface IAccordion {
	type: "accordion";
	header: string;
	content: string;
}

interface IReactNode {
	type: "react_node";
	content: React.ReactNode;
}

type IDocsData = IAccordionGroup | IReactNode | IAccordion;

export const docsData: IDocsData[] = [
	{
		type: "react_node",
		content: <h1 style={{color:"white"}}>Docs</h1>,
	},
	{
		type: "react_node",
		content: (
			<>
				<p style={{ color: "white" }}>
					<span>Welcome to this project!</span>
					<br />
					<span>Wanna try?</span>
				</p>
			</>
		),
	},
	{
		type: "accordion_group",
		content: [
			{
				type: "accordion",
				header: `<h1 class="${styles.accordion_title}">Getting Started</h1>`,
				content: "getting-started",
			},
			{
				type: "accordion",
				header: `<h1 class="${styles.accordion_title}">Node types</h1>`,
				content: "<h1>getting-started</h1>",
			},
		],
	}
];
