import { IAddNodeRequest } from "../drawflow.types";

export interface INode {
    name: TNodeList;
	html: string;
	getNode(request?: IGetNodeRequest): IAddNodeRequest;
	getComponent(): HTMLDivElement;
}

export interface IGetNodeRequest {
	name?: string;
	x?: number;
	y?: number;
	className?: string;
	data?: object;
}

export const nodeList = ["start", "request"] as const;

export type TNodeList = (typeof nodeList)[number];

export type INodeList = {
	[key in TNodeList]: INode;
};
