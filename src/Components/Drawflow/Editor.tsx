import "./drawflow.theme.scss";
import styles from "./Drawflow.module.scss";
import { CSSProperties, useEffect, useState } from "react";
import { EState } from "../../types";
import { NodeList } from "./Modules";
import { TNodeList } from "./Modules/module.type";
import { Drawflow } from "./drawflow";
import { PlayArrow } from "@mui/icons-material";
import { ISlideInMenuItem, SlideInMenu } from "../Menu/SlideIn";
import { ExportModal, ImportModal } from "./ImportExportModal";
import { Result } from "./Result";

interface IDrawflowEditor {
	style?: CSSProperties;
	className?: string;
}

export const DrawflowEditor: React.FC<IDrawflowEditor> = (
	props: IDrawflowEditor
) => {
	const [state, setState] = useState<EState>(EState.INITIAL);
	const [editor, setEditor] = useState<Drawflow>();
	const [openModal, setOpenModal] = useState<"import" | "export" | "result" | null>(
		null
	);
	const [executionResult, setExecutionResult] = useState<string>('');

	const menuItems: ISlideInMenuItem[] = Object.keys(NodeList).map((name) => {
		return {
			type: "button",
			label: name + " Node",
			onClick: () => {
				editor?.addNode(NodeList[name as TNodeList].getNode());
			},
		};
	});

	menuItems.push(
		{
			type: "separator",
		},
		{
			type: "icon",
			label: "Run",
			icon: PlayArrow,
			onClick: () => {
				editor?.run().then((result) => {
					if (result) {
						setExecutionResult(result)
					}
				})
			},
		},
		{
			type: "button",
			label: "Result",
			onClick: () => {
				setOpenModal("result");
			},
		},
		{
			type: "separator",
		},
		{
			type: "button",
			label: "Export",
			onClick: () => {
				setOpenModal("export");
			},
		},
		{
			type: "button",
			label: "Import",
			onClick: () => {
				setOpenModal("import");
			},
		},
		{
			type: "button",
			label: "Clear",
			onClick: () => {
				editor?.clear();
			},
		}
	);

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
		<div
			className={`${styles.editor_container} ${props.className}`}
			style={props.style}
		>
			<div id="drawflow" className={`${styles.editor}`}></div>
			{state === EState.SUCCESS && (
				<SlideInMenu
					position="bottom"
					direction="right"
					items={menuItems}
				/>
			)}
			{editor && (
				<ImportModal
					editor={editor}
					open={openModal === "import"}
					onClose={() => setOpenModal(null)}
				/>
			)}
			{editor && (
				<ExportModal
					data={editor.export()}
					open={openModal === "export"}
					onClose={() => setOpenModal(null)}
				/>
			)}
			{openModal === "result" && <Result executionResult={executionResult} onClose={() => setOpenModal(null)}/>}
		</div>
	);
};
