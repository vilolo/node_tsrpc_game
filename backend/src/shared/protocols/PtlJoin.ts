import { GameSystemState } from "../game/GameSystem";

/** 加入房间 */
export interface ReqJoin {
    rid:number,
    openid: string,
}

export interface ResJoin {
    /** 状态同步：一次性同步当前状态 */
    gameState: GameSystemState
}

// export const conf = {}