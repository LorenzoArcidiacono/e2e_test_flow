import { IBaseResponse } from "../../../types";
import { IAddNodeRequest } from "../drawflow.types";

export interface INode {
	name: TNodeList;
	html: string;
	getNode(request?: IGetNodeRequest): IAddNodeRequest;
	getComponent(): HTMLDivElement;
	getName(): string;
}

export interface INodeExecutable extends INode {
	execute(
		data: object,
	): Promise<IBaseResponse>;
}

export interface IGetNodeRequest {
	name?: string;
	x?: number;
	y?: number;
	className?: string;
	data?: object;
}

export const nodeList = ["start", "request", "param"] as const;

export type TNodeList = (typeof nodeList)[number];

export type INodeList = {
	[key in TNodeList]: INode;
};
