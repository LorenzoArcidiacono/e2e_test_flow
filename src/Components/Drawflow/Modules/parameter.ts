import { IAddNodeRequest } from "../drawflow.types";
import { IGetNodeRequest, INode, TNodeList } from "./module.type";
import styles from "./modules.module.scss";
import { random } from "../../../utils";

export const ParameterNode: INode = class CParameterNode {
	static name: TNodeList = "param";

	static html = `
        <div class=${styles.node_content}>
            <p class='${styles.title}'>Parameter</p>
			<fieldset>
				<p class='${styles.legend}'>ID</p>
				<input placeholder='ID' type="text" df-id/>
			</fieldset>
            <fieldset>
				<p class='${styles.legend}'>JSON</p>
				<textarea placeholder='{"data": 10}' cols="30" rows="10" df-data></textarea>
			</fieldset>
        </div>
    `;

	static getNode(request?: IGetNodeRequest): IAddNodeRequest {
		return {
			name: request?.name || `${this.name}_node`,
			inputs: 0,
			outputs: 0,
			x: request?.x || 150,
			y: request?.y || 300,
			className: `${request?.className} ${this.name}_node`,
			data: request?.data || {id:`PN-${random(0,1000)}`},
			nodeName: this.name,
		};
	}

	static getComponent() {
		const module_html = document.createElement("div");
		module_html.innerHTML = this.html;
		return module_html;
	}

	static getName(){
		return this.name;
	}
};
