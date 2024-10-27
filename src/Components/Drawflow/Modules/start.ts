import { IAddNodeRequest } from "../drawflow.types";
import { IGetNodeRequest, INode, TNodeList } from "./module.type";
import styles from "./modules.module.scss";

export const StartNode: INode = class CStartNode {
	static name: TNodeList = "start";
	static html = `
        <div class='${styles.node_content} ${styles.mini}'>
            <p class='${styles.title}'>Start</p>
        </div>
    `;

	static getNode(request?: IGetNodeRequest): IAddNodeRequest {
		return {
			name: request?.name || `${this.name}_node`,
			inputs: 0,
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
