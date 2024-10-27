import DrawflowMain from "drawflow";
import { IAddNodeRequest } from "./drawflow.types";
import { NodeList } from "./Modules";
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

	registerNode(name: string, node: HTMLDivElement) {
		this.editor.registerNode(name, node, {}, {});
	}

	export(){
		return this.editor.export();
	}

	import(data: object){
		this.editor.import(data);
	}

	clear(){
		this.editor.clear();
	}

	// UTILS
	private registerAllNodes() {
		Object.keys(NodeList).forEach((key) => {
			this.registerNode(key, NodeList[key as TNodeList].getComponent());
		});
	}

	
}
