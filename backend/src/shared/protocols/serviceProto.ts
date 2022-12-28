import { ServiceProto } from 'tsrpc-proto';
import { MsgClientInput } from './client/MsgClientInput';
import { MsgChat } from './MsgChat';
import { ReqJoin, ResJoin } from './PtlJoin';
import { ReqLogin, ResLogin } from './PtlLogin';
import { ReqSend, ResSend } from './PtlSend';
import { ReqTest, ResTest } from './PtlTest';
import { MsgFrame } from './server/MsgFrame';

export interface ServiceType {
    api: {
        "Join": {
            req: ReqJoin,
            res: ResJoin
        },
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
        "client/ClientInput": MsgClientInput,
        "Chat": MsgChat,
        "server/Frame": MsgFrame
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 4,
    "services": [
        {
            "id": 4,
            "name": "client/ClientInput",
            "type": "msg"
        },
        {
            "id": 0,
            "name": "Chat",
            "type": "msg"
        },
        {
            "id": 5,
            "name": "Join",
            "type": "api"
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
        },
        {
            "id": 6,
            "name": "server/Frame",
            "type": "msg"
        }
    ],
    "types": {
        "client/MsgClientInput/MsgClientInput": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "sn",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "inputs",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "client/MsgClientInput/ClientInput"
                        }
                    }
                }
            ]
        },
        "client/MsgClientInput/ClientInput": {
            "target": {
                "type": "Reference",
                "target": "../game/GameSystem/PlayerMove"
            },
            "keys": [
                "openid"
            ],
            "type": "Omit"
        },
        "../game/GameSystem/PlayerMove": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Literal",
                        "literal": "PlayerMove"
                    }
                },
                {
                    "id": 1,
                    "name": "openid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "speed",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "x",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 1,
                                "name": "y",
                                "type": {
                                    "type": "Number"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 3,
                    "name": "dt",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
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
        "PtlJoin/ReqJoin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "rid",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 0,
                    "name": "openid",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlJoin/ResJoin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "gameState",
                    "type": {
                        "type": "Reference",
                        "target": "../game/GameSystem/GameSystemState"
                    }
                }
            ]
        },
        "../game/GameSystem/GameSystemState": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "now",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "players",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../game/state/PlayerState/PlayerState"
                        }
                    }
                }
            ]
        },
        "../game/state/PlayerState/PlayerState": {
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
                    "name": "pos",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "x",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 1,
                                "name": "y",
                                "type": {
                                    "type": "Number"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 2,
                    "name": "dizzyEndTime",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
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
        },
        "server/MsgFrame/MsgFrame": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "inputs",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../game/GameSystem/GameSystemInput"
                        }
                    }
                },
                {
                    "id": 1,
                    "name": "lastSn",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "../game/GameSystem/GameSystemInput": {
            "type": "Union",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../game/GameSystem/PlayerMove"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Reference",
                        "target": "../game/GameSystem/PlayerJoin"
                    }
                },
                {
                    "id": 2,
                    "type": {
                        "type": "Reference",
                        "target": "../game/GameSystem/PlayerLeave"
                    }
                },
                {
                    "id": 3,
                    "type": {
                        "type": "Reference",
                        "target": "../game/GameSystem/TimePast"
                    }
                }
            ]
        },
        "../game/GameSystem/PlayerJoin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Literal",
                        "literal": "PlayerJoin"
                    }
                },
                {
                    "id": 1,
                    "name": "openid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "pos",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "x",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 1,
                                "name": "y",
                                "type": {
                                    "type": "Number"
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "../game/GameSystem/PlayerLeave": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Literal",
                        "literal": "PlayerLeave"
                    }
                },
                {
                    "id": 1,
                    "name": "openid",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "../game/GameSystem/TimePast": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Literal",
                        "literal": "TimePast"
                    }
                },
                {
                    "id": 1,
                    "name": "dt",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        }
    }
};