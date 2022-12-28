import { WsConnection, WsServer } from "tsrpc";
import { gameConfig } from "../shared/game/gameConfig";
import { GameSystem, GameSystemInput, PlayerJoin } from "../shared/game/GameSystem";
import { ReqJoin } from "../shared/protocols/PtlJoin";
import { ServiceType } from "../shared/protocols/serviceProto";

export class Room{
    // 帧同步频率，次数/秒
    syncRate = gameConfig.syncRate;

    gameSystem = new GameSystem();

    server: WsServer<ServiceType>;
    conns: WsConnection<ServiceType>[] = [];
    pendingInputs: GameSystemInput[] = [];
    playerLastSn: { [openid: string]: number | undefined } = {};
    lastSyncTime?: number;

    constructor(server: WsServer<ServiceType>) {
        this.server = server;
        setInterval(() => { this.sync() }, 1000 / this.syncRate);
    }

    join(req: ReqJoin, conn: WsConnection<ServiceType>){
        let input: PlayerJoin = {
            type: 'PlayerJoin',
            openid: req.openid,
            // 初始位置随机
            pos: {
                x: Math.random() * 10 - 5,
                y: Math.random() * 10 - 5
            }
        }
        this.applyInput(input);
        this.conns.push(conn);
        conn.openid = input.openid;
        conn.listenMsg('client/ClientInput', call => {
            this.playerLastSn[input.openid] = call.msg.sn;
            call.msg.inputs.forEach(v => {
                this.applyInput({
                    ...v,
                    openid:input.openid
                })
            })
        });

        return input.openid;
    }

    applyInput(input: GameSystemInput) {
        this.pendingInputs.push(input);
    }

    sync() {
        let inputs = this.pendingInputs;
        this.pendingInputs = [];

        // Apply inputs
        inputs.forEach(v => {
            //计算状态
            // this.gameSystem.applyInput(v)
        });

        let now = process.uptime()*1000;
        this.applyInput({
            type: 'TimePast',
            dt: now - (this.lastSyncTime ?? now)
        });
        this.lastSyncTime = now;

        // 发送同步帧
        this.conns.forEach(v => {
            v.sendMsg('server/Frame', {
                inputs: inputs,
                lastSn: this.playerLastSn[v.openid!]
            })
        });
    }

    /** 离开房间 */
    leave(openid: string, conn: WsConnection<ServiceType>) {
        this.conns.removeOne(v => v.openid === openid);
        this.applyInput({
            type: 'PlayerLeave',
            openid: openid
        });
    }
}

declare module 'tsrpc' {
    export interface WsConnection {
        openid?: string;
    }
}