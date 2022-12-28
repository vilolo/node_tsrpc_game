import { ApiCallWs } from "tsrpc";
import { roomInstance } from "..";
import { ReqJoin, ResJoin } from "../shared/protocols/PtlJoin";

export default async function (call: ApiCallWs<ReqJoin, ResJoin>) {
    let openid = roomInstance.join(call.req, call.conn);

    call.succ({
        openid: openid,
        gameState: roomInstance.gameSystem.state
    })
}