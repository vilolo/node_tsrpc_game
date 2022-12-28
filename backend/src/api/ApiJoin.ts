import { ApiCallWs } from "tsrpc";
import RoomManager from "../models/RoomManager";
import { ReqJoin, ResJoin } from "../shared/protocols/PtlJoin";

export default async function (call: ApiCallWs<ReqJoin, ResJoin>) {
    let room = RoomManager.Instance.joinRoom(call.req, call.conn);
    if(room){
        call.succ({
            gameState: room.gameSystem.state
        })
    }else{
        call.error("加入失败")
    }
}