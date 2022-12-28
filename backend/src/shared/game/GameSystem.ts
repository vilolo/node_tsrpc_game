import { PlayerState } from "./state/PlayerState";

// 状态定义
export interface GameSystemState {
    // 当前的时间（游戏时间）
    now: number,
    // 玩家
    players: PlayerState[],
}

export class GameSystem {
    // 当前状态
    private _state: GameSystemState = {
        now: 0,
        players: []
    }
    get state(): Readonly<GameSystemState> {
        return this._state
    }
}

export interface PlayerMove {
    type: 'PlayerMove',
    openid: string,
    speed: { x: number, y: number },
    // 移动的时间 (秒)
    dt: number,
}
export interface PlayerJoin {
    type: 'PlayerJoin',
    openid: string,
    pos: { x: number, y: number }
}
export interface PlayerLeave {
    type: 'PlayerLeave',
    openid: string,
}
// 时间流逝
export interface TimePast {
    type: 'TimePast',
    dt: number
}
export type GameSystemInput = PlayerMove
    | PlayerJoin
    | PlayerLeave
    | TimePast;