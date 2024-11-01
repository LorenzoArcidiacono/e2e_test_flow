import DrawflowMain, { DrawflowNode } from "drawflow";
import {
	IAddNodeRequest,
	IDrawflowData,
	START_NODE_NAME,
	TExecuteNodeResult,
	TGetNextNodeResult,
} from "./drawflow.types";
import { NodeList, RequestNode } from "./Modules";
import { TNodeList } from "./Modules/module.type";

export class Drawflow {
	private editor: DrawflowMain;

	constructor(selector: string, mode?: "edit" | "fixed") {
		const element = document.getElementById(selector);
		if (!element) {
			throw new Error("Element not found");
		}

		this.editor = new DrawflowMain(element);
		this.editor.editor_mode = mode || "edit";
		this.editor.start();
		this.registerAllNodes();
	}

	addNode(request: IAddNodeRequest) {
		this.editor.addNode(
			request.name,
			request.inputs,
			request.outputs,
			request.x,
			request.y,
			`${request.className}`,
			request.data,
			request.nodeName,
			true
		);
	}

	export() {
		return this.editor.export();
	}

	import(data: object) {
		this.editor.import(data);
	}

	clear() {
		this.editor.clear();
	}

	// RUN

	async run() {
		let executionResultText = "$ Start\n";
		let end = false;

		const exported = this.editor.export();
		const { data } = exported.drawflow.Home;
		const indexStartNode = this.getStartNode(data);

		if (!indexStartNode) {
			alert("Start node not found");
			return;
		}

		this.resetNodeVisitedResult();

		let indexCurrentNode = indexStartNode;
		let indexNextNode = indexStartNode;

		while (!end) {
			indexCurrentNode = indexNextNode;

			// DO SOMETHING
			const resultExecute = await this.executeNode(
				data[indexCurrentNode]
			);

			console.log("resultExecute", resultExecute);

			executionResultText += resultExecute.message;
			if (resultExecute.success === false) {
				this.setNodeVisitedResult(indexCurrentNode, "error");
				end = true;
				break;
			}
			this.setNodeVisitedResult(indexCurrentNode, "success");

			// SET NEXT
			const resultGetNext = this.getNextNode(data, indexCurrentNode);
			executionResultText += resultGetNext.message;
			if (resultGetNext.success === false) {
				end = true;
			} else {
				indexNextNode = resultGetNext.nextNode;
			}
		}

		executionResultText += "\n$ Finished";
		console.log(executionResultText);
		return executionResultText;
	}

	private getStartNode(data: IDrawflowData) {
		return Object.keys(data).find((node) => {
			return data[node].class.includes(START_NODE_NAME);
		});
	}

	private getNextNode(
		data: IDrawflowData,
		currentIndex: string
	): TGetNextNodeResult {
		switch (data[currentIndex].name) {
			case "if_node":
				break;
			default:
				if (!data[currentIndex].outputs["output_1"].connections[0]) {
					return {
						success: false,
						message: `\n$ Node ${data[currentIndex].name} not connected`,
					};
				}

				return {
					success: true,
					nextNode:
						data[currentIndex].outputs["output_1"].connections[0]
							.node,
					message: "\n$ ",
				};
		}

		return {
			success: false,
		};
	}

	private async executeNode(node: DrawflowNode): Promise<TExecuteNodeResult> {
		switch (node.name) {
			case "start_node":
			case "if_node":
				return {
					success: true,
					message: "$ "+ node.name + " executed",
				};
			case "request_node":
				return RequestNode.execute(node.data)
					.then((result) => {
						console.log("request_node", result);
						return {
							success: result.success,
							message: JSON.stringify(result, null, 2),
						};
					})
					.catch((error) => {
						return {
							success: false,
							message: error.message,
						};
					});
			default:
				return {
					success: false,
					message: `Node ${node.name} execution not found`,
				};
		}
	}

	// UTILS
	private registerNode(name: string, node: HTMLDivElement) {
		this.editor.registerNode(name, node, {}, {});
	}

	private setNodeVisitedResult(index: string, result: "success" | "error") {
		document
			.getElementById("node-" + index)
			?.classList.add(result === "success" ? "success" : "error");
	}

	private resetNodeVisitedResult() {
		const elements = document.getElementsByClassName("drawflow-node");

		for (const element of elements) {
			element.classList.remove("success", "error");
		}
	}

	private registerAllNodes() {
		Object.keys(NodeList).forEach((key) => {
			this.registerNode(key, NodeList[key as TNodeList].getComponent());
		});
	}
}
