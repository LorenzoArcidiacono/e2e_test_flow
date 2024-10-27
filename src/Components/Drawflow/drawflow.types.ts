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
