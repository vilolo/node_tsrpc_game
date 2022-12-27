import { BaseRequest, BaseResponse, BaseConf } from "./base";

export interface ReqTest extends BaseRequest {
    name:string;
}

export interface ResTest extends BaseResponse {
    user:{
        id:number,
        name:string
    }
}

export const conf: BaseConf = {
    
}