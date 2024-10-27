import { DrawflowNode } from "drawflow";
import { TNodeList } from "./Modules/module.type";

export interface IAddNodeRequest {
	name: string;
	inputs: number;
	outputs: number;
	x: number;
	y: number;
	className: string;
	data: object;
	nodeName: TNodeList;
}

export interface IDrawflowData {
	[key: string]: DrawflowNode;
}

export const START_NODE_NAME = "start_node";

export type TGetNextNodeResult = TGetNextNodeResultSuccess | TBaseErrorResult;

export type TExecuteNodeResult = TExecuteNodeResultSuccess | TBaseErrorResult;

type TGetNextNodeResultSuccess = {
	success: true;
	nextNode: string;
	message?: string;
};

type TExecuteNodeResultSuccess = {
	success: true;
	message?: string; 
};

type TBaseErrorResult = {
	success: false;
	message?: string;
};
