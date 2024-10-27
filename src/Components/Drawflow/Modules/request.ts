import { IAddNodeRequest } from "../drawflow.types";
import { IGetNodeRequest, INode, TNodeList } from "./module.type";
import styles from "./modules.module.scss";

export const RequestNode: INode = class CRequestNode {
	static name: TNodeList = "request";

	static html = `
        <div class=${styles.node_content}>
            <p class='${styles.title}'>Request</p>
			<select df-method>
				<option value="" disabled selected>Method</option>
				<option value="GET">GET</option>
				<option value="POST">POST</option>
				<option value="PUT">PUT</option>
			</select>
            <input placeholder='URL' type="text" df-url/>
            <textarea placeholder='Data' cols="30" rows="10" df-data></textarea>
        </div>
    `;

	static getNode(request?: IGetNodeRequest): IAddNodeRequest {
		return {
			name: request?.name || `${this.name}_node`,
			inputs: 1,
			outputs: 1,
			x: request?.x || 150,
			y: request?.y || 300,
			className: `${request?.className} ${this.name}_node`,
			data: request?.data || {},
			nodeName: this.name,
		};
	}

	static getComponent() {
		const module_html = document.createElement("div");
		module_html.innerHTML = this.html;
		return module_html;
	}
};
