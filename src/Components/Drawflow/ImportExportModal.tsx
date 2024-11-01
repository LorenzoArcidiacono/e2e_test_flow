import { useState } from "react";
import styles from "./Drawflow.module.scss";
import { Drawflow } from "./drawflow";
import { Card, CardActions, CardContent, CardHeader } from "../Card/Card";
import { Button } from "../Buttons";
import { Modal } from "../Modal/Modal";
import { Check, ContentCopy, Publish } from "@mui/icons-material";
import { TextArea } from "../Inputs";

interface IImportModal {
	editor: Drawflow;
	open: boolean;
	onClose: () => void;
}

interface IExportModal {
	data: object;
	open: boolean;
	onClose: () => void;
}

export const ImportModal: React.FC<IImportModal> = (props: IImportModal) => {
	const [text, setText] = useState("");

	if (!props.open) {
		return null;
	}

	const handleImport = () => {
        props.editor.import(JSON.parse(text));
        setText("");
        props.onClose();
	};

	return (
		<Modal onClose={props.onClose}>
			<Card
				className={styles.importer_card}
				onClose={() => props.onClose()}
			>
				<CardHeader>Import</CardHeader>
				<CardContent>
					<TextArea
						cols={50}
						rows={20}
						placeholder={`{"drawflow":{"Home":{"data":{...}}}}`}
						onChange={(value) => setText(value)}
						value={text}
					/>
				</CardContent>
				<CardActions>
					<Button
						color="accent"
						onClick={handleImport}
						variant="link"
						label="Import"
						startIcon={Publish}
						disabled={text === ""}
					/>
				</CardActions>
			</Card>
		</Modal>
	);
};

export const ExportModal: React.FC<IExportModal> = (props: IExportModal) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
		navigator.clipboard.writeText(JSON.stringify(props.data));
	};

	if (!props.open) {
		return null;
	}

	return (
		<Modal onClose={props.onClose}>
			<Card
				className={styles.importer_card}
				onClose={() => props.onClose()}
			>
				<CardHeader>Export your flow</CardHeader>
				<CardContent
					style={{ maxHeight: "30dvh", overflowY: "scroll" }}
				>
					<pre>{JSON.stringify(props.data, null, 2)}</pre>
				</CardContent>
				<CardActions>
					<Button
						color="accent"
						variant="link"
						startIcon={copied ? Check : ContentCopy}
						label={copied ? "Copied" : "Copy"}
						onClick={copied ? () => {} : handleCopy}
					/>
				</CardActions>
			</Card>
		</Modal>
	);
};
