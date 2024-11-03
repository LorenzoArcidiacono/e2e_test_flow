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
				<p class='${styles.legend}'>Header</p>
				<textarea placeholder='{}' cols="30" rows="10" df-header></textarea>
			</fieldset>
            <fieldset>
				<p class='${styles.legend}'>Data</p>
				<textarea placeholder='{}' cols="30" rows="10" df-body></textarea>
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
			data: request?.data || { id: `RN-${random(0, 1000)}` },
			nodeName: this.name,
		};
	}

	static getComponent() {
		const module_html = document.createElement("div");
		module_html.innerHTML = this.html;
		return module_html;
	}

	static getName() {
		return this.name;
	}

	static async execute(
		data: {
			method: string;
			url: string;
			header?: string;
			body?: string;
		}
	): Promise<IBaseResponse> {
		let response: AxiosResponse;
		let body: object = {};
		let header: object = {};

		// HEADER
		try {
			header = JSON.parse(data.header || "{}");
		} catch (error) {
			console.error(error);
			return {
				success: false,
				statusCode: 500,
				message: `Not a valid JSON: ${data.header}`,
			};
		}

		// BODY
		try {
			body = JSON.parse(data.body || "{}");
		} catch (error) {
			console.error(error);
			return {
				success: false,
				statusCode: 500,
				message: `Not a valid JSON: ${data.body}`,
			};
		}

		try {
			switch (data.method) {
				case "GET":
					response = await axios.get(data.url, { headers: header });
					break;
				case "POST":
					response = await axios.post(data.url, body, {
						headers: header,
					});
					break;
				case "PATCH":
					response = await axios.patch(data.url, body, {
						headers: header,
					});
					break;
				case "PUT":
					response = await axios.put(data.url, body, {
						headers: header,
					});
					break;
				case "DELETE":
					response = await axios.delete(data.url, {
						headers: header,
					});
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
				};
			} else {
				return {
					success: false,
					statusCode: 0,
					message: error.message,
				};
			}
		}
	}
};
