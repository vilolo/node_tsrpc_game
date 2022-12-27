import { TsrpcError } from "tsrpc";
import Player from "./Player";
import PlayerManager from "./PlayerManager";
import Room from "./Room";
import Singleton from "./Singleton";

export default class RoomManager extends Singleton {
    static get Instance(){
        return super.GetInstance<RoomManager>()
    }

    //目前只有一个房间，服务启动时创建
    nextRoomId = 1;
    idMapRoom: Map<number, Room> = new Map();
    openidMapPlayer: Map<number, [Player]> = new Map();   //房间用户

    createRoom(openid:string) {
        const room = new Room(this.nextRoomId++,openid);
        this.idMapRoom.set(room.rid, room);
        return room;
    }

    joinRoom(rid: number, openid: string){
        const room = this.getRoomById(rid);
        if (room) {
            const player = PlayerManager.Instance.getPlayerByOpendid(openid);
            if (player) {
                player.rid = rid
                PlayerManager.Instance.createPlayer(player)

                //添加到房间用户
                let playerList = this.openidMapPlayer.get(rid)
                if(playerList){
                    playerList.push(xxxx)
                }
            }
            return room;
        }
        throw new TsrpcError('房间ID不存在')
    }

    getRoomById(id: number){
        return this.idMapRoom.get(id);
    }
}