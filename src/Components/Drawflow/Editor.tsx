import { CSSProperties, useEffect, useState } from "react";
import styles from "./Drawflow.module.scss";
import { EState } from "../../types";
import { Button } from "../Buttons/Button";
import "./drawflow.theme.scss";
import { NodeList } from "./Modules";
import { TNodeList } from "./Modules/module.type";
import { Drawflow } from "./drawflow";

interface IDrawflowEditor {
	style?: CSSProperties;
	className?: string;
}

export const DrawflowEditor: React.FC<IDrawflowEditor> = (
	props: IDrawflowEditor
) => {
	const [state, setState] = useState<EState>(EState.INITIAL);
	const [editor, setEditor] = useState<Drawflow>();

	useEffect(() => {
		if (state !== EState.INITIAL) {
			return;
		}
		setState(EState.LOADING);
		const id = document.getElementById("drawflow");
		if (id) {
			setEditor(new Drawflow("drawflow"));

			setState(EState.SUCCESS);
		} else {
			console.log("ERROR");
			setState(EState.ERROR);
		}
	}, [state]);

	return (
		<>
			{editor && <Menu editor={editor} />}
			<div
				id="drawflow"
				className={`${styles.editor} ${props.className}`}
				style={props.style}
			></div>
		</>
	);
};

const Menu = (props: { editor: Drawflow }) => {
	const { editor } = props;
	return (
		<div className={styles.menu}>
			{Object.keys(NodeList).map((name) => (
				<Button
					key={name}
					className={styles.menu_btn}
					onClick={() => {
						editor.addNode(NodeList[name as TNodeList].getNode());
					}}
					label={`Add ${name} Node`}
				/>
			))}
			<Button
				onClick={() => {
					const exported = editor.export();
					console.log(exported);
				}}
				label="Export"
			/>
			<Button
				onClick={() => {
					editor.clear();
				}}
				label="Clear"
			/>
		</div>
	);
};
