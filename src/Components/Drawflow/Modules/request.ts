import { random } from "../../../utils";
import { IAddNodeRequest } from "../drawflow.types";
import { IGetNodeRequest, INode, TNodeList } from "./module.type";
import styles from "./modules.module.scss";

export const RequestNode: INode = class CRequestNode {
	static name: TNodeList = "request";

	static html = `
        <div class=${styles.node_content}>
            Ciao Request
            <input type="text" df-url/>
            <input type="text" df-data/>
        </div>
    `;

	static getNode(request?: IGetNodeRequest): IAddNodeRequest {
		return {
			name: request?.name || `${this.name}_${random()}`,
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
