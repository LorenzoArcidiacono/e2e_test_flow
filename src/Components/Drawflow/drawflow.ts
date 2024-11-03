import DrawflowMain, { DrawflowNode } from "drawflow";
import {
	IAddNodeRequest,
	IDrawflowData,
	TExecuteNodeResult,
	TGetNextNodeResult,
} from "./drawflow.types";
import {
	NodeList,
	ParameterNode,
	replacePlaceholders,
	RequestNode,
	StartNode,
} from "./Modules";
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
		this.setSingleOutput();
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
		const params = this.getAllParams(data);
		console.log(params);

		let indexCurrentNode = indexStartNode;
		let indexNextNode = indexStartNode;
		const executionResultData: { [key: string]: { [key: string]: never } } =
			{};

		while (!end) {
			indexCurrentNode = indexNextNode;

			// DO SOMETHING
			const resultExecute = await this.executeNode(
				data[indexCurrentNode],
				executionResultData
			);

			executionResultText += resultExecute.message;

			if (resultExecute.success === true && resultExecute.message) {
				try {
					const executionData = JSON.parse(resultExecute.message);
					executionResultData[data[indexCurrentNode].data.id] =
						executionData[data[indexCurrentNode].data.id].data;
				} catch (error) {
					console.error(error);
				}
			}

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
		return executionResultText;
	}

	private getStartNode(data: IDrawflowData) {
		return Object.keys(data).find((node) => {
			return data[node].name.includes(StartNode.name);
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
						message: `\n$ Node ${
							data[currentIndex].data.id ||
							data[currentIndex].name
						} not connected`,
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

	private async executeNode(
		node: DrawflowNode,
		currentExecutionResultData: { [key: string]: { [key: string]: never } }
	): Promise<TExecuteNodeResult> {
		switch (node.name) {
			case "start_node":
			case "if_node":
				return {
					success: true,
					message: "$ " + node.name + " executed",
				};
			case "request_node":
				if (node.data.header) {
					node.data.header = replacePlaceholders({
						data: node.data.header,
						currentExecutionData: currentExecutionResultData,
					});
				}

				if (node.data.body) {
					node.data.body = replacePlaceholders({
						data: node.data.body,
						currentExecutionData: currentExecutionResultData,
					});
				}

				return RequestNode.execute(node.data)
					.then((result) => {
						return {
							success: result.success,
							message: JSON.stringify(
								{ [node.data.id]: { ...result } },
								null,
								2
							),
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

	private setSingleOutput() {
		const self = this as Drawflow;
		this.editor.on("connectionCreated", function (info) {
			const nodeInfo = self.editor.getNodeFromId(info.output_id);
			if (nodeInfo.outputs[info.output_class].connections.length > 1) {
				const removeConnectionInfo =
					nodeInfo.outputs[info.output_class].connections[0];
				self.editor.removeSingleConnection(
					info.output_id,
					removeConnectionInfo.node,
					info.output_class,
					removeConnectionInfo.output
				);
			}
		});
	}

	private getAllParams(data: IDrawflowData) {
		const keys = Object.keys(data);
		const result: {
			[key: string]: object;
		} = {};

		keys.forEach((key) => {
			if (data[key].name.includes(ParameterNode.getName())) {
				try {
					result[data[key].data.id] = JSON.parse(data[key].data.data);
				} catch (error) {
					console.error(
						`Not a valid JSON:\n ${JSON.stringify(
							data[key]
						)}\n, ${error}`
					);
				}
			}
		});

		return result;
	}
}
