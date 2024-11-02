import axios, { AxiosError, AxiosResponse } from "axios";
import { IBaseResponse } from "../../../types";
import { IAddNodeRequest } from "../drawflow.types";
import { IGetNodeRequest, INodeExecutable, TNodeList } from "./module.type";
import styles from "./modules.module.scss";
import { random } from "../../../utils";

export const RequestNode: INodeExecutable = class CRequestNode {
	static name: TNodeList = "request";

	static html = `
        <div class=${styles.node_content}>
            <p class='${styles.title}'>Request</p>
			<fieldset>
				<p class='${styles.legend}'>ID</p>
				<input placeholder='ID' id="test" type="text" df-id/>
			</fieldset>
			<select df-method>
				<option value="" disabled selected>Method</option>
				<option value="GET">GET</option>
				<option value="POST">POST</option>
				<option value="PUT">PUT</option>
			</select>
			<fieldset>
				<p class='${styles.legend}'>URL</p>
				<input placeholder='https://...' type="text" df-url/>
			</fieldset>
            <fieldset>
				<p class='${styles.legend}'>Data</p>
				<textarea placeholder='Data' cols="30" rows="10" df-data></textarea>
			</fieldset>
            
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
			data: request?.data || {id:`RN-${random(0,1000)}`},
			nodeName: this.name,
		};
	}

	static getComponent() {
		const module_html = document.createElement("div");
		module_html.innerHTML = this.html;
		return module_html;
	}

	static async execute(data: {
		method: string;
		url: string;
		body?: object;
	}): Promise<IBaseResponse> {
		let response: AxiosResponse;

		try {
			switch (data.method) {
				case "GET":
					response = await axios.get(data.url);
					break;
				case "POST":
					response = await axios.post(data.url, data.body);
					break;
				case "PATCH":
					response = await axios.patch(data.url, data.body);
					break;
				case "PUT":
					response = await axios.put(data.url, data.body);
					break;
				case "DELETE":
					response = await axios.delete(data.url);
					break;
				default:
					return {
						success: false,
						statusCode: 500,
						message: `Method ${data.method} not implemented`,
					};
			}

			return {
				success: true,
				statusCode: response.status,
				data: response.data,
			};
		} catch (error_) {
			const error = error_ as AxiosError;
			if (error.response) {
				return {
					success: false,
					statusCode: error.response.status,
					message: JSON.stringify(error.response.data),
				};
			} else if (error.request) {
				return {
					success: false,
					statusCode: 0,
					message: "No response received",
				}
			} else {
				return {
					success: false,
					statusCode: 0,
					message: error.message,
				}
			}
		}
	}
};
