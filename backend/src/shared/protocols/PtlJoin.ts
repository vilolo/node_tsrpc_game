import { GameSystemState } from "../game/GameSystem";

/** 加入房间 */
export interface ReqJoin {
    openid: string,
}

export interface ResJoin {
    /** 加入房间后，自己的 ID */
    openid: string,
    /** 状态同步：一次性同步当前状态 */
    gameState: GameSystemState
}

// export const conf = {}