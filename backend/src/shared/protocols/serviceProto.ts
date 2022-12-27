import { ServiceProto } from 'tsrpc-proto';
import { MsgChat } from './MsgChat';
import { ReqLogin, ResLogin } from './PtlLogin';
import { ReqSend, ResSend } from './PtlSend';
import { ReqTest, ResTest } from './PtlTest';

export interface ServiceType {
    api: {
        "Login": {
            req: ReqLogin,
            res: ResLogin
        },
        "Send": {
            req: ReqSend,
            res: ResSend
        },
        "Test": {
            req: ReqTest,
            res: ResTest
        }
    },
    msg: {
        "Chat": MsgChat
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 2,
    "services": [
        {
            "id": 0,
            "name": "Chat",
            "type": "msg"
        },
        {
            "id": 3,
            "name": "Login",
            "type": "api",
            "conf": {}
        },
        {
            "id": 1,
            "name": "Send",
            "type": "api"
        },
        {
            "id": 2,
            "name": "Test",
            "type": "api",
            "conf": {}
        }
    ],
    "types": {
        "MsgChat/MsgChat": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "PtlLogin/ReqLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "openid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "nickname",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "avatar",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "base/BaseRequest": {
            "type": "Interface"
        },
        "PtlLogin/ResLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "user",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "uid",
                                "type": {
                                    "type": "Number"
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "base/BaseResponse": {
            "type": "Interface"
        },
        "PtlSend/ReqSend": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlSend/ResSend": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "PtlTest/ReqTest": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlTest/ResTest": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "user",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "id",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 1,
                                "name": "name",
                                "type": {
                                    "type": "String"
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }
};