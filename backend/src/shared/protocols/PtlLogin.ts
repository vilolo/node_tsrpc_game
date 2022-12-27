import { BaseRequest, BaseResponse, BaseConf } from "./base";

export interface ReqLogin extends BaseRequest {
    openid:string;
    nickname:string;
    avatar?:string;
}

export interface ResLogin extends BaseResponse {
    user:{
        uid:number
    }
}

export const conf: BaseConf = {
    
}