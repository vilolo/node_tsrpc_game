import { TsrpcError, WsConnection, WsServer } from "tsrpc";
import { gameConfig } from "../shared/game/gameConfig";
import { GameSystem, GameSystemInput, PlayerJoin } from "../shared/game/GameSystem";
import { ReqJoin } from "../shared/protocols/PtlJoin";
import { ServiceType } from "../shared/protocols/serviceProto";
import Player from "./Player";
import PlayerManager from "./PlayerManager";

export class Room{
    id: number;
    mapPlayers: Map<string,Player> = new Map();
    
    // 帧同步频率，次数/秒
    syncRate = gameConfig.syncRate;

    gameSystem = new GameSystem();

    conns: WsConnection<ServiceType>[] = [];
    pendingInputs: GameSystemInput[] = [];
    playerLastSn: { [openid: string]: number | undefined } = {};
    lastSyncTime?: number;

    constructor(rid: number) {
        this.id = rid;
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

        let player = PlayerManager.Instance.getPlayerByOpendid(input.openid);
        if(!player){
            throw new TsrpcError('请先登录');
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

        this.mapPlayers.set(input.openid, player);
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
        // this.applyInput({
        //     type: 'TimePast',
        //     dt: now - (this.lastSyncTime ?? now)
        // });
        this.lastSyncTime = now;

        if(inputs.length > 0){
            // 发送同步帧
            this.conns.forEach(v => {
                v.sendMsg('server/Frame', {
                    inputs: inputs,
                    lastSn: this.playerLastSn[v.openid!]
                })
            });
        }
        
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