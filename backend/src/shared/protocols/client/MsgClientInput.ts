import { PlayerMove } from "../../game/GameSystem";

/** 发送自己的输入 */
export interface MsgClientInput {
    sn: number,
    inputs: ClientInput[]
};

export type ClientInput = Omit<PlayerMove, 'openid'>;