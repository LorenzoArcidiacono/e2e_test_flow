import { Modal } from "../Modal/Modal";
import { Card, CardContent, CardHeader } from "../Card/Card";

interface IResult {
	executionResult: string;
	onClose: () => void;
}

export const Result: React.FC<IResult> = (props: IResult) => {
	return (
		<Modal onClose={props.onClose}>
			<Card onClose={props.onClose} style={{ maxWidth: "50%"}}>
				<CardHeader>Execution Result</CardHeader>
				<CardContent>
					<pre
						style={{
							whiteSpace: "pre-wrap",
							maxWidth: "100%",
							maxHeight: "30dvh",
							overflowX: "hidden",
							overflowY: 'scroll',
						}}
					>
						{props.executionResult}
					</pre>
				</CardContent>
			</Card>
		</Modal>
	);
};
