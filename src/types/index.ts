export * from "./enums";

export interface IBaseResponseSuccess {
	success: true;
	statusCode: number;
	message?: string;
	data?: object;
}

export interface IBaseResponseError {
	success: false;
	statusCode: number;
	message?: string;
}

export type IBaseResponse = IBaseResponseSuccess | IBaseResponseError;
