import { INodeList } from "./module.type";
import { ParameterNode } from "./parameter";
import { RequestNode } from "./request";
import { StartNode } from "./start";

export * from "./start";
export * from "./request";
export * from "./parameter";

export const NodeList: INodeList = {
	start: StartNode,
	request: RequestNode,
	param: ParameterNode,
};

/**
 * replace all placeholders in a string.
 * @example data: '{"authorization":"{{NODE_ID.authorization}}"}', currentExecutionData: { "NODE_ID": { "authorization": "value" } }
 * 
 * @param request { data: string, currentExecutionData: { [key: string]: { [key: string]: never } } }
 * @returns a string where all placeholders are replaced based on currentExecutionData
 */
export function replacePlaceholders(request: {
	data: string;
	currentExecutionData: { [key: string]: { [key: string]: never } };
}): string {
	let result = request.data;
	const matches = [...request.data.matchAll(/\{\{(.*?)\}\}/g)].map(
		(match) => match[1]
	);

	for (const match of matches) {
		const [index, key] = match.split(".");
		if (
			request.currentExecutionData[index] &&
			request.currentExecutionData[index][key]
		) {
			result = result.replace(
				`{{${match}}}`,
				request.currentExecutionData[index][key]
			);
		}
	}

	return result;
}
