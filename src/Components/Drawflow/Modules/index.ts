import { INodeList } from './module.type';
import { RequestNode } from './request';
import { StartNode } from './start';

export * from './start';
export * from './request';

export const NodeList: INodeList = {
    start: StartNode,
    request: RequestNode,
}